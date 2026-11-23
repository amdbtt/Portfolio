/* =========================================================
   Content data – edit text here, the page re-renders from it
   ========================================================= */
window.DATA = {
  email: 'laibajay21@gmail.com',

  marquee: ['WordPress','Shopify','WooCommerce','eBay','Etsy','Machine Learning','Flutter','Python','Claude AI','Unity 3D','React Native','SQL'],

  tech: [
    ['W','sq'],['Woo','sq'],['S','sq'],['E','sf'],['ebay','sf'],['php','sq'],['SQL','sq'],['JS','sq'],['5','sq'],['CSS','sq'],['⚛','sf'],['Py','sq'],['F','sq'],['C#','sq'],['Fig','sq']
  ],

  icons: {
    wp:'<circle cx="12" cy="12" r="9"/><path d="M6 8l3.5 9L12 10l2.5 7L18 8"/>',
    bag:'<path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8a3 3 0 016 0"/>',
    cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 12h11l2-8H6"/>',
    tag:'<path d="M3 12V3h9l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',
    boxes:'<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    spark:'<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
    phone:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
    db:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    code:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    brain:'<path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 3 3 3 0 001 2.5A3 3 0 006 17a3 3 0 003 3h1V4H9z"/><path d="M15 4a3 3 0 013 3 3 3 0 012 3 3 3 0 01-1 2.5A3 3 0 0118 17a3 3 0 01-3 3h-1V4h1z"/>'
  },

  services: [
    { t:'WordPress Websites', d:'Fast, editable WordPress sites with Elementor: landing pages, full builds, plugin setup and responsive polish.', cta:'Plan a website', icon:'wp' },
    { t:'Shopify Stores', d:'Store setup, theme editing, collections and product pages arranged so a shopper finds what they need and checks out.', cta:'Plan a store', icon:'bag' },
    { t:'WooCommerce', d:'Products, variations, payments and shipping configured on WordPress, with clean categories and order flow.', cta:'Set up a shop', icon:'cart' },
    { t:'eBay Listings', d:'Listing optimisation, item specifics, pricing and photos that help products rank in eBay search.', cta:'Improve listings', icon:'tag' },
    { t:'Etsy Shops', d:'Shop setup, tags, titles and product stories for handmade and personalised items.', cta:'Build an Etsy shop', icon:'heart' },
    { t:'eCommerce Management', d:'Day-to-day catalogue upkeep, product uploads, descriptions and stock across store and marketplace channels.', cta:'Manage a catalogue', icon:'boxes' },
    { t:'Machine Learning & Vision', d:'Deep-learning models that read images and text together, from data preparation to evaluation and write-up.', cta:'Discuss research', icon:'eye' },
    { t:'AI-Assisted Work', d:'Claude, ChatGPT and Gemini used every day for product copy, code, research and faster delivery, always checked by hand.', cta:'Work faster with AI', icon:'spark' },
    { t:'Mobile Apps', d:'Cross-platform apps in Flutter and React Native, designed screen by screen with clean navigation.', cta:'Discuss an app', icon:'phone' },
    { t:'Databases & SQL', d:'Relational schemas, normalisation and SQL that keep records like orders, bookings and billing correct.', cta:'Design a database', icon:'db' }
  ],
  tones: ['purple','teal','brown','cream'],

  projects: [
    { cat:'Research · Deep Learning', t:'BMRF-Net', tag:'Research', tone:'purple',
      d:'Final-year research on referring segmentation: give the model a photo and a sentence such as "the woman holding the red umbrella", and it outlines exactly that object. Submitted for publication.',
      b:['Language and vision fused at several scales','Boundary-aware attention for crisp outlines','Supervised by Umar Ramzan, GIFT University'],
      s:['Python','Deep Learning','Computer Vision'] },
    { cat:'Venture · eCommerce', t:'CraftyHubOfficial', tag:'Venture', tone:'teal',
      d:'Founded and ran a craft brand of unique, personalised products for the Pakistani market, building entrepreneurship, creativity and business-development skills.',
      b:['Original craft product concepts','Business and project management','International Women Entrepreneurship Certificate'],
      s:['eCommerce','Branding','Social selling'] },
    { cat:'Mobile App · Flutter', t:'CamoWild', tag:'Mobile App', tone:'brown',
      d:'A cross-platform mobile app built in Flutter: one codebase for Android and iOS, from screen design and navigation to state management.',
      b:['Single Flutter codebase for two platforms','Screen-by-screen UI design','State management and navigation'],
      s:['Flutter','Dart'] },
    { cat:'Mobile App · React Native', t:'Dinner Spinner', tag:'Mobile App', tone:'cream',
      d:'A React Native app that settles the daily "what\'s for dinner?" question with a spin of the wheel.',
      b:['Random meal picker for everyday use','Built in React Native','One codebase for Android and iOS'],
      s:['React Native','JavaScript'] },
    { cat:'Game · Unity 3D', t:'The Land of Shadows', tag:'Game', tone:'purple',
      d:'An interactive Unity 3D game world built around light and shadow, with C# gameplay scripting and level design. A+ in Game Development.',
      b:['C# gameplay scripting','Level design and lighting','3D scene and camera work'],
      s:['Unity 3D','C#'] },
    { cat:'Database · SQL', t:'Hotel Management System', tag:'Database', tone:'teal',
      d:'A relational database for a hotel: schema design, normalisation and SQL behind rooms, guests, bookings and billing.',
      b:['Normalised schema for rooms and guests','Bookings and billing in SQL','Database Management Systems project'],
      s:['SQL','PHP','MySQL'] }
  ],

  timeline: [
    { when:'Apr 2026', tag:'Hackathon', t:'Harvard HSIL Hackathon', org:'Harvard T.H. Chan School of Public Health · Health Systems Innovation Lab', d:'Two days of collaborative problem-solving on health-systems challenges at GIFT University.' },
    { when:'2025 – 2026', tag:'Research', t:'BMRF-Net research', org:'Final Year Project · GIFT University', d:'Deep-learning research on referring image segmentation, written up as a paper submitted for publication.' },
    { when:'University years', tag:'Venture', t:'Founder, CraftyHubOfficial', org:'Creative craft venture', d:'Ran a craft brand of personalised products. Awarded an International Women Entrepreneurship Certificate.' },
    { when:'2022 – 2026', tag:'Education', t:'BS (Hons) Computer Science', org:'GIFT University', d:'CGPA 3.35, rising to 3.77 in the final semester. A+ in Game Development and Digital Marketing.' },
    { when:'2021', tag:'Education', t:'Intermediate, Pre-Medical', org:'Punjab College for Women', d:'Grade A+.' },
    { when:'2019', tag:'Education', t:'Matriculation, Science', org:"The Educator's", d:'Grade A+.' }
  ],

  skills: [
    { t:'eCommerce', icon:'store', tone:'purple', items:[['WordPress','W'],['WooCommerce','Wo'],['Shopify','S'],['Elementor','E'],['eBay','eb'],['Etsy','Et']] },
    { t:'AI & Machine Learning', icon:'brain', tone:'teal', items:[['Python','Py'],['Claude','✺'],['ChatGPT','G'],['Gemini','✦'],['Copilot','Co'],['Hugging Face','HF']] },
    { t:'Apps & Games', icon:'phone', tone:'brown', items:[['Flutter','F'],['Dart','D'],['React Native','⚛'],['Unity 3D','U'],['Firebase','Fb'],['Android Studio','As']] },
    { t:'Web, Data & Design', icon:'code', tone:'cream', items:[['HTML','5'],['CSS','C'],['JavaScript','JS'],['PHP','php'],['MySQL','My'],['Figma','Fg']] }
  ],

  products: [
    ['Aura Headphones','$149','New'],['Drift Runners','$89'],['Meridian Watch','$179'],
    ['Transit Backpack','$69','-20%'],['No. 19 Eau de Parfum','$58'],['Daily Ritual Set','$34','New']
  ]
};
