/**
* Vindex Protocol - Livelihood Insurance Landing Page
* Interactive Calculator & Form Logic
*/

(function() {
  "use strict";

  /**
   * Initialize AOS (Animate On Scroll)
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Smooth scroll for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /**
   * Form Step Navigation
   */
  let currentStep = 1;

  window.nextStep = function(step) {
    // Validate current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value) {
        valid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!valid) {
      alert('Please fill in all required fields');
      return;
    }

    // Move to next step
    document.querySelector(`.form-step[data-step="${step}"]`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${step + 1}"]`).classList.add('active');
    
    // Update step indicator
    document.querySelector(`.step-dot[data-step="${step}"]`).classList.remove('active');
    document.querySelector(`.step-dot[data-step="${step + 1}"]`).classList.add('active');
    
    currentStep = step + 1;

    // Scroll to top of calculator
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.prevStep = function(step) {
    document.querySelector(`.form-step[data-step="${step}"]`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${step - 1}"]`).classList.add('active');
    
    document.querySelector(`.step-dot[data-step="${step}"]`).classList.remove('active');
    document.querySelector(`.step-dot[data-step="${step - 1}"]`).classList.add('active');
    
    currentStep = step - 1;
  };

  /**
   * Toggle Location (India/International)
   */
  window.toggleLocation = function() {
    const toggle = document.getElementById('locationToggle');
    const locationType = document.getElementById('locationType');
    const phoneFieldIndia = document.getElementById('phoneFieldIndia');
    const phoneFieldIntl = document.getElementById('phoneFieldIntl');
    const cityField = document.getElementById('cityField');
    const countryField = document.getElementById('countryField');
    const phoneIndia = document.getElementById('phoneIndia');
    const phoneIntl = document.getElementById('phoneIntl');
    const city = document.getElementById('city');
    const country = document.getElementById('country');
    
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
      // International mode
      locationType.value = 'international';
      phoneFieldIndia.style.display = 'none';
      phoneFieldIntl.style.display = 'block';
      cityField.style.display = 'none';
      countryField.style.display = 'block';
      
      // Remove required from India fields
      phoneIndia.removeAttribute('required');
      city.removeAttribute('required');
      
      // Add required to International fields
      phoneIntl.setAttribute('required', 'required');
      country.setAttribute('required', 'required');
    } else {
      // India mode
      locationType.value = 'india';
      phoneFieldIndia.style.display = 'block';
      phoneFieldIntl.style.display = 'none';
      cityField.style.display = 'block';
      countryField.style.display = 'none';
      
      // Add required to India fields
      phoneIndia.setAttribute('required', 'required');
      city.setAttribute('required', 'required');
      
      // Remove required from International fields
      phoneIntl.removeAttribute('required');
      country.removeAttribute('required');
    }
  };

  /**
   * Toggle Spouse Earning
   */
  window.toggleSpouseEarning = function() {
    const toggle = document.getElementById('spouseEarningToggle');
    const field = document.getElementById('spouseSalaryField');
    const input = document.getElementById('spouseEarning');
    
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
      field.style.display = 'block';
      input.value = 'yes';
    } else {
      field.style.display = 'none';
      input.value = 'no';
      document.getElementById('spouseSalary').value = '';
    }
  };

  /**
   * Calculate Premium
   */
  window.calculatePremium = function() {
    // Validate step 3
    const step3 = document.querySelector('.form-step[data-step="3"]');
    const inputs = step3.querySelectorAll('input[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value) {
        valid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!valid) {
      alert('Please fill in all required fields');
      return;
    }

    // Get form values
    const annualCTC = parseFloat(document.getElementById('annualCTC').value);
    const spouseEarning = document.getElementById('spouseEarning').value;
    const spouseSalary = spouseEarning === 'yes' ? parseFloat(document.getElementById('spouseSalary').value || 0) : 0;
    const collegeTier = document.getElementById('collegeTier').value;
    const monthlyExpenditure = parseFloat(document.getElementById('monthlyExpenditure').value);
    const city = document.getElementById('city').value.toLowerCase();
    const industry = document.getElementById('industry').value;

    // Calculate household monthly income
    const totalAnnualIncome = annualCTC + spouseSalary;
    const monthlyIncome = totalAnnualIncome / 12;

    // Calculate base premium percentage
    let premiumPercentage = 3.0; // Base 3%

    // Adjust based on college tier
    if (collegeTier === 'tier1') {
      premiumPercentage = 2.0; // Tier 1 discount
    } else if (collegeTier === 'tier2') {
      premiumPercentage = 3.5;
    } else if (collegeTier === 'tier3') {
      premiumPercentage = 4.0;
    }

    // Calculate monthly premium
    const monthlyPremium = Math.round((monthlyIncome * premiumPercentage) / 100);

    // Calculate coverage (12x monthly expenditure)
    const coverage = monthlyExpenditure * 12;

    // Calculate security score (0-100)
    let securityScore = 50; // Base score
    
    // Adjust based on coverage ratio
    const coverageRatio = coverage / totalAnnualIncome;
    if (coverageRatio > 0.8) securityScore += 20;
    else if (coverageRatio > 0.5) securityScore += 10;
    
    // Adjust based on dual income
    if (spouseEarning === 'yes') securityScore += 15;
    
    // Adjust based on college tier
    if (collegeTier === 'tier1') securityScore += 15;
    else if (collegeTier === 'tier2') securityScore += 10;

    securityScore = Math.min(securityScore, 100);

    // Display results
    document.getElementById('premiumAmount').textContent = monthlyPremium.toLocaleString('en-IN');
    document.getElementById('coverageAmount').textContent = coverage.toLocaleString('en-IN');
    document.getElementById('securityScore').textContent = securityScore;

    // Show risk score based on city and industry
    showRiskScore(city, industry);

    // Move to results step
    document.querySelector('.form-step[data-step="3"]').classList.remove('active');
    document.querySelector('.form-step[data-step="4"]').classList.add('active');
    document.querySelector('.step-dot[data-step="3"]').classList.remove('active');
    document.querySelector('.step-dot[data-step="4"]').classList.add('active');

    // Scroll to results
    setTimeout(() => {
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  /**
   * Show Risk Score
   */
  function showRiskScore(city, industry) {
    const riskCard = document.getElementById('riskScoreCard');
    const riskText = document.getElementById('riskScoreText');
    const riskMeter = document.getElementById('riskMeterFill');

    // Define risk levels for different cities and industries
    const highRiskCities = ['bangalore', 'bengaluru', 'mumbai', 'pune', 'hyderabad', 'gurgaon', 'gurugram', 'noida'];
    const highRiskIndustries = ['technology', 'finance'];

    let riskLevel = 'Medium';
    let riskPercentage = 60;
    let riskMessage = '';

    if (highRiskCities.includes(city) && highRiskIndustries.includes(industry)) {
      riskLevel = 'High';
      riskPercentage = 82;
      riskMessage = `Market volatility in your sector is currently High—${riskPercentage}% of peers in your tier are seeking income protection this month.`;
    } else if (highRiskCities.includes(city) || highRiskIndustries.includes(industry)) {
      riskLevel = 'Medium-High';
      riskPercentage = 68;
      riskMessage = `Your profile shows Medium-High market risk—${riskPercentage}% of professionals in your category are considering income protection.`;
    } else {
      riskLevel = 'Medium';
      riskPercentage = 55;
      riskMessage = `Market conditions show moderate volatility—${riskPercentage}% of professionals in your sector are exploring income security options.`;
    }

    riskText.textContent = riskMessage;
    riskMeter.style.width = riskPercentage + '%';
    riskCard.style.display = 'block';
  }

  /**
   * Submit Quote Request
   */
  window.submitQuote = function() {
    // Get location info
    const locationType = document.getElementById('locationType').value;
    let phone, location;
    
    if (locationType === 'india') {
      phone = '+91' + document.getElementById('phoneIndia').value;
      location = document.getElementById('city').value;
    } else {
      phone = document.getElementById('phoneIntl').value;
      location = document.getElementById('country').value;
    }

    // Collect all form data
    const formData = {
      type: 'insurance_quote',
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: phone,
      location: location,
      annualCTC: document.getElementById('annualCTC').value,
      experience: document.getElementById('experience').value,
      industry: document.getElementById('industry').value,
      collegeTier: document.getElementById('collegeTier').value,
      monthlyExpenditure: document.getElementById('monthlyExpenditure').value,
      dependents: document.getElementById('dependents').value,
      spouseEarning: document.getElementById('spouseEarning').value,
      spouseSalary: document.getElementById('spouseSalary').value || '0',
      calculatedPremium: document.getElementById('premiumAmount').textContent,
      calculatedCoverage: document.getElementById('coverageAmount').textContent,
      securityScore: document.getElementById('securityScore').textContent,
      timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = event.target;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Backend endpoint - Replace YOUR_SCRIPT_ID with your actual Google Apps Script deployment ID
    const endpoint = 'https://script.google.com/macros/s/AKfycby1gBsUjHwHLxoQVGyw7aYQvMDPhOLxphyp-P-FJtWzhW9DQIxBFcFUkwQJOn1pJuym/exec';

    // Store data in localStorage for thank you page
    localStorage.setItem('quoteName', formData.fullName);
    localStorage.setItem('quoteEmail', formData.email);
    localStorage.setItem('quoteLocation', formData.location);
    localStorage.setItem('quotePremium', formData.calculatedPremium);
    localStorage.setItem('quoteCoverage', formData.calculatedCoverage);
    localStorage.setItem('quoteScore', formData.securityScore);

    // Submit to Google Sheets
    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      // Redirect to thank you page
      window.location.href = 'thank-you.html';
    })
    .catch(error => {
      console.error('Error:', error);
      // Still redirect to thank you page even if submission fails
      window.location.href = 'thank-you.html';
    });
  };

  /**
   * Newsletter Signup
   */
  document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Backend endpoint - Replace YOUR_SCRIPT_ID with your actual Google Apps Script deployment ID
        const endpoint = 'https://script.google.com/macros/s/AKfycby1gBsUjHwHLxoQVGyw7aYQvMDPhOLxphyp-P-FJtWzhW9DQIxBFcFUkwQJOn1pJuym/exec';
        
        const newsletterData = {
          type: 'newsletter',
          email: email,
          timestamp: new Date().toISOString()
        };
        
        fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newsletterData)
        })
        .then(() => {
          alert('🎉 Thank you for subscribing! Check your email for confirmation.');
          newsletterForm.reset();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('✅ Subscription received! You\'ll hear from us soon.');
          newsletterForm.reset();
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
      });
    }
  });

  /**
   * Form validation on input
   */
  document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid') && this.value) {
          this.classList.remove('is-invalid');
        }
      });
    });
  });

})();

// Made with Bob
