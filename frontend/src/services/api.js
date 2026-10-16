const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
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
    headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${res.status}) while regenerating day`);
  }
  return await res.json();
}

export async function saveTrip(tripData) {
  const res = await fetch(`${API_BASE}/api/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to save trip (${res.status})`);
  }
  return await res.json();
}

export async function getTrips() {
  const res = await fetch(`${API_BASE}/api/trips`);
  if (!res.ok) throw new Error(`Failed to load saved trips: ${res.status}`);
  return await res.json();
}

export async function getTripById(id) {
  const res = await fetch(`${API_BASE}/api/trips/${id}`);
  if (!res.ok) throw new Error(`Failed to load trip: ${res.status}`);
  return await res.json();
}

export async function deleteTrip(id) {
  const res = await fetch(`${API_BASE}/api/trips/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`Failed to delete trip: ${res.status}`);
  return await res.json();
}

export async function downloadPdf(itinerary) {
  const res = await fetch(`${API_BASE}/api/export/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
