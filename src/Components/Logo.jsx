// src/components/Logo.js


const Logo = () => {
  return (
            <svg 
  viewBox="0 0 100 100" 
  xmlns="http://www.w3.org/2000/svg"
  width="40" 
  height="40"
>

  <rect x="10" y="10" width="80" height="80" rx="5" fill="#2563EB" />
 
  <line x1="10" y1="30" x2="90" y2="30" stroke="#93C5FD" stroke-width="2" />
  <line x1="10" y1="50" x2="90" y2="50" stroke="#93C5FD" stroke-width="2" />
  <line x1="10" y1="70" x2="90" y2="70" stroke="#93C5FD" stroke-width="2" />
  <line x1="30" y1="10" x2="30" y2="90" stroke="#93C5FD" stroke-width="2" />
  <line x1="50" y1="10" x2="50" y2="90" stroke="#93C5FD" stroke-width="2" />
  <line x1="70" y1="10" x2="70" y2="90" stroke="#93C5FD" stroke-width="2" />

  <path 
    d="M40,65 L50,45 L60,65 M45,58 L55,58" 
    stroke="#FFFFFF" 
    stroke-width="5" 
    stroke-linecap="round"
    fill="none"
  />
  

  <line 
    x1="75" 
    y1="25" 
    x2="85" 
    y2="25" 
    stroke="#FBBF24" 
    stroke-width="3" 
    stroke-linecap="round"
  />
  <line 
    x1="75" 
    y1="25" 
    x2="75" 
    y2="15" 
    stroke="#FBBF24" 
    stroke-width="3" 
    stroke-linecap="round"
  />
</svg>
  );
};

export default Logo;