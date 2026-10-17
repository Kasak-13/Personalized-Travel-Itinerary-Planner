const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Persistent client/user identifier so each user only sees & manages their own trips
export function getClientId() {
  let clientId = localStorage.getItem('wanderplan_client_id');
  if (!clientId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      clientId = crypto.randomUUID();
    } else {
      clientId = 'usr_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    }
    localStorage.setItem('wanderplan_client_id', clientId);
  }
  return clientId;
}

function getHeaders(extraHeaders = {}) {
  return {
    'Content-Type': 'application/json',
    'X-Client-Id': getClientId(),
    ...extraHeaders
  };
}

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Health check error:', err);
    return null;
  }
}

export async function generateItinerary(preferences) {
  const res = await fetch(`${API_BASE}/api/itinerary/generate`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(preferences)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${res.status}) while generating itinerary`);
  }
  return await res.json();
}

export async function regenerateDay(req) {
  const res = await fetch(`${API_BASE}/api/itinerary/regenerate-day`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(req)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${res.status}) while regenerating day`);
  }
  return await res.json();
}

export async function saveTrip(tripData) {
  // Ensure user_id is bound to client identity
  const payload = {
    ...tripData,
    user_id: getClientId()
  };

  const res = await fetch(`${API_BASE}/api/trips`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to save trip (${res.status})`);
  }
  return await res.json();
}

export async function getTrips() {
  const res = await fetch(`${API_BASE}/api/trips`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Failed to load saved trips: ${res.status}`);
  return await res.json();
}

export async function getTripById(id) {
  const res = await fetch(`${API_BASE}/api/trips/${id}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Failed to load trip: ${res.status}`);
  return await res.json();
}

export async function deleteTrip(id) {
  const res = await fetch(`${API_BASE}/api/trips/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Failed to delete trip: ${res.status}`);
  return await res.json();
}

export async function downloadPdf(itinerary) {
  const res = await fetch(`${API_BASE}/api/export/pdf`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(itinerary)
  });
  if (!res.ok) throw new Error(`Failed to generate PDF: ${res.status}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Itinerary_${itinerary.destination.replace(/[\s,]+/g, '_')}_${itinerary.start_date}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
