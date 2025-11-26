// PMC landing calculator + signup handling
function calculateSavings(){
  const volume = parseFloat(document.getElementById('volume').value) || 0;
  const transactions = parseInt(document.getElementById('transactions').value) || 0;
  // average tx value not used directly in basic fee calc, left for future
  // current processor fees (2.9% + $0.30 per tx)
  const currentFees = (volume * 0.029) + (transactions * 0.30);
  const solvyCost = 24.99;

  const currentEl = document.getElementById('current-fees');
  const solvyEl = document.getElementById('solvy-cost');
  const savingsEl = document.getElementById('savings-amount');

  if(currentEl) currentEl.textContent = '$' + Math.round(currentFees);
  if(solvyEl) solvyEl.textContent = '$' + solvyCost;
  if(savingsEl) savingsEl.textContent = '$' + Math.max(0, Math.round(currentFees - solvyCost));
}

document.addEventListener('DOMContentLoaded', ()=>{
  const volume = document.getElementById('volume');
  const transactions = document.getElementById('transactions');
  const avgTx = document.getElementById('avg-tx');

  if(volume) volume.addEventListener('input', calculateSavings);
  if(transactions) transactions.addEventListener('input', calculateSavings);
  if(avgTx) avgTx.addEventListener('change', calculateSavings);
  calculateSavings();

  // Signup form
  const form = document.getElementById('signup-form');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const payload = {
        name: document.getElementById('app-name').value.trim(),
        pmc_id: document.getElementById('app-id').value.trim(),
        email: document.getElementById('app-email').value.trim(),
        business: document.getElementById('app-business').value.trim(),
        plan: 'Founding 50',
        price: 24.99
      };

      // Try POST to API; fallback to alert and mailto
      try{
        const res = await fetch('/api/contact-eva', {
          method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)
        });
        if(res.ok){
          alert('Thank you! Your PMC application has been received. We will contact you within 24 hours.');
          form.reset();
          return;
        }
      }catch(err){
        // network error or not available
      }

      // Fallback: open mail client with prefilled content
      const subject = encodeURIComponent('PMC Founding 50 application');
      const body = encodeURIComponent(`Name: ${payload.name}\nPMC ID: ${payload.pmc_id}\nEmail: ${payload.email}\nBusiness: ${payload.business}\nPlan: ${payload.plan}`);
      window.location.href = `mailto:sanathan@ebl.beauty?subject=${subject}&body=${body}`;
    });
  }
});
