document.getElementById('marketplaceForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const statusMsg = document.getElementById('statusMessage');
  
  const payload = {
    title: document.getElementById('title').value.trim(),
    price: document.getElementById('price').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value.trim()
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing Payload...';

  try {
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      statusMsg.className = 'status-box success';
      statusMsg.textContent = `Payload Dispatched Successfully! (ID: ${result.data.id})`;
      this.reset();
    } else {
      throw new Error(result.message || 'Submission failed.');
    }
  } catch (err) {
    statusMsg.className = 'status-box error';
    statusMsg.textContent = err.message;
  } finally {
    statusMsg.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Dispatch Listing Payload';
  }
});
