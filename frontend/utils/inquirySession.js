export const newSessionId = () => globalThis.crypto?.randomUUID?.() || `kdh-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Synchronous guards cover double clicks before React's next state render.
export const startSubmission = state => {
  if (state.pending || state.delivered) return false;
  state.id = state.id || newSessionId();
  state.pending = true;
  return true;
};
export const finishSubmission = (state, delivered) => {
  state.pending = false;
  state.delivered = delivered === true;
};
export const editSubmission = state => {
  if (state.pending) return false;
  if (state.delivered) { state.id = null; state.delivered = false; }
  return true;
};
