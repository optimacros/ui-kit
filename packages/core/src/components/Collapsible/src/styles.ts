export const css = `
/* collapsible.css */
.collapsible-root {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}

.collapsible-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.collapsible-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  font-weight: 500;
  text-align: left;
}

.collapsible-trigger:hover {
  background-color: #f9fafb;
}

.collapsible-content {
  padding: 0.5rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.collapsible-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
  transform: rotate(-90deg);
}

[data-scope="collapsible"][data-part="indicator"][data-state="open"] {
  transform: rotate(180deg);
}

/* Custom Styled Collapsible */
.collapsible-custom {
  background-color: #eff6ff;
  border: 2px solid #bfdbfe;
  border-radius: 0.75rem;
  overflow: hidden;
}

.collapsible-custom .collapsible-trigger {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: #1d4ed8;
}

.collapsible-custom .collapsible-trigger:hover {
  background-color: #dbeafe;
}

.collapsible-custom .collapsible-content {
  padding: 1rem 1.5rem;
  background-color: white;
  border-top: 2px solid #bfdbfe;
}

.collapsible-custom .collapsible-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

/* Multiple Sections */
.collapsible-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Controlled Collapsible */
.close-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  cursor: pointer;
}

.close-button:hover {
  background-color: #e5e7eb;
}

.collapsible-icon {
  transition: transform 0.2s ease;
}
`;
