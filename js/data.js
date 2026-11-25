/* =========================================================
   Content data – edit text here, the page re-renders from it
   ========================================================= */
window.DATA = {
  email: 'ahmd.bt35@gmail.com',
  phone: '03071686603',
  linkedin: 'https://www.linkedin.com/in/ahmad-qq3/',

  marquee: ['Python','LangChain','LangGraph','React','TypeScript','Node.js','Next.js','FastAPI','PostgreSQL','Docker','AWS','React Native'],

  tech: [
    ['Python','assets/tech/python.svg'],
    ['LangChain','assets/tech/langchain.svg'],
    ['React','assets/tech/react.svg'],
    ['JavaScript','assets/tech/javascript.svg'],
    ['TypeScript','assets/tech/typescript.svg'],
    ['Node.js','assets/tech/nodejs.svg'],
    ['Next.js','assets/tech/nextjs.svg'],
    ['FastAPI','assets/tech/fastapi.svg'],
    ['Django','assets/tech/django.svg'],
    ['PHP','assets/tech/php.svg'],
    ['HTML5','assets/tech/html5.svg'],
    ['CSS','assets/tech/css.svg'],
    ['Tailwind CSS','assets/tech/tailwind.svg'],
    ['Bootstrap','assets/tech/bootstrap.svg'],
    ['MongoDB','assets/tech/mongodb.svg'],
    ['PostgreSQL','assets/tech/postgresql.svg'],
    ['Firebase','assets/tech/firebase.svg'],
    ['Redis','assets/tech/redis.svg'],
    ['Docker','assets/tech/docker.svg'],
    ['Git','assets/tech/git.svg'],
    ['AWS','assets/tech/aws.svg'],
    ['Google Cloud','assets/tech/gcp.svg']
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
    { highlight:true, cat:'React Native · Computer Vision', t:'CamoWild', tag:'Highlight', tone:'teal',
      d:'A React Native CLI mobile app for camouflaged object detection in the wild. Python vision pipelines with OpenCV, PyTorch and YOLO spot hidden animals in complex scenes, while Pinecone powers similarity search over detection embeddings.',
      b:['Camouflaged object detection with confidence overlays and binary masks','Real-time analytics for scans, detections, accuracy and reports','Pinecone-backed retrieval over vision embeddings','Subscription flows for Basic and Pro detection plans'],
      s:['Python','React Native CLI','Computer Vision','OpenCV','PyTorch','YOLO','Pinecone'],
      img:'assets/highlights/camowild/1.jpg' },
    { highlight:true, cat:'Full Stack 3D AI Platform', t:'MetaBread', tag:'Highlight', tone:'purple',
      d:'A dual company 3D processing platform for point clouds and geospatial assets. Computer vision with Detectron2 and LangGraph workflows in Python, a React frontend, Django APIs, and PostgreSQL with pgVector. Built for autonomous vehicles, AR/VR, robotics and geospatial AI.',
      groups:[
        { h:'Vision and AI', items:['Detectron2 computer vision pipelines in Python','LangGraph workflows for multi step processing','pgVector search over geospatial and 3D asset embeddings'] },
        { h:'Product stack', items:['React frontend for dashboards and 3D review','Django APIs for processing jobs and company workflows','PostgreSQL for durable storage and retrieval'] },
        { h:'Other highlights', items:['3D asset handling with upload, versioning and global search','Built for autonomous vehicles, AR/VR, robotics and geospatial AI'] }
      ],
      s:['Python','Computer Vision','LangGraph','Detectron2','React','Django','PostgreSQL','pgVector'],
      img:'assets/projects/metabread/images/dashboard.jpg',
      video:'assets/videos/metabread/demo.mp4',
      poster:'assets/projects/metabread/images/dashboard.jpg' },
    { highlight:true, cat:'AI Medical Imaging', t:'NeuroScan Brain Tumor MRI Classifier', tag:'Highlight', tone:'teal',
      d:'A diagnostic workstation that classifies brain MRI scans with a VGG16 model and returns tumor type probabilities with confidence and risk tags. When a disease or cancer signal is found, a LangGraph chatbot uses Google location GPS to suggest the best hospitals nearby or at a place the user chooses.',
      b:['Classifies meningioma, glioma, pituitary and no tumor cases','CPU inference with vectorised NumPy preprocessing','LangGraph chatbot that recommends hospitals with Google location GPS','Nearest hospital results or a location the user selects'],
      s:['Python','VGG16','NumPy','MRI','LangGraph','Google Maps'],
      img:'assets/highlights/neuroscan/1.jpg',
      url:'https://github.com/amdbtt/NeuroScan' },
    { highlight:true, cat:'Vue.js · Property platform', t:'RentInc', tag:'Highlight', tone:'brown',
      d:'A Leeds-focused rental platform built with Vue.js and Bootstrap — property search, listings, maps and live chat, plus a smart chatbot system powered by LangGraph, served on AWS/Nginx behind Cloudflare with GA4, GTM and conversion tracking.',
      b:['Vue.js + Bootstrap UI with Swiper/Slick carousels','Smart chatbot system using LangGraph + Python','Google Maps, Cloudinary media and WhatsApp/Zendesk/Trengo chat','AWS, Nginx, Cloudflare CDN with GA4, Hotjar, Meta Pixel and GTM'],
      s:['Vue.js','Bootstrap','LangGraph','Python','AWS','Cloudflare','Google Maps','Cloudinary'],
      img:'assets/highlights/rentinc/1.jpg',
      url:'https://www.rentinc.co.uk/' },
    { cat:'Research · Deep Learning', t:'BMRF-Net', tag:'Research', tone:'brown',
      d:'Final-year research on referring segmentation: give the model a photo and a sentence such as "the woman holding the red umbrella", and it outlines exactly that object. Submitted for publication.',
      b:['Language and vision fused at several scales','Boundary-aware attention for crisp outlines','Supervised by Umar Ramzan, GIFT University'],
      s:['Python','Deep Learning','Computer Vision'] },
    { cat:'Full Stack · eCommerce', t:'Forever', tag:'eCommerce', tone:'purple',
      d:'An eCommerce brand storefront built on the MERN stack, with product browsing, cart and checkout flows, plus smart recommendation to surface products shoppers are more likely to buy.',
      b:['Full MERN stack: MongoDB, Express, React and Node.js','Smart product recommendation across the catalogue','Responsive storefront for browsing, cart and checkout'],
      s:['MERN','Smart Recommendation','MongoDB','Express','React','Node.js'],
      img:'assets/projects/forever/images/1.png',
      imgs:[
        'assets/projects/forever/images/1.png',
        'assets/projects/forever/images/2.png',
        'assets/projects/forever/images/3.png',
        'assets/projects/forever/images/4.png',
        'assets/projects/forever/images/5.png',
        'assets/projects/forever/images/6.png'
      ] },
    { cat:'Full Stack · Food Delivery', t:'Tomato', tag:'Food Delivery', tone:'teal',
      d:'A food delivery platform with restaurant browsing, cart and live order flow — React on the front, Django APIs, and Firebase for auth and realtime updates.',
      b:['React storefront for menus, cart and checkout','Django backend for restaurants, orders and delivery logic','Firebase auth and realtime order status'],
      s:['React','Django','Firebase'],
      img:'assets/projects/tomato/images/1.png',
      imgs:[
        'assets/projects/tomato/images/1.png',
        'assets/projects/tomato/images/2.png',
        'assets/projects/tomato/images/3.png'
      ] }
  ],

  timeline: [
    { when:'Present', tag:'Entrepreneurship', t:'Region Design&IT', org:'Co-Founder & Software Developer', d:'Co-founded a software development and IT services company focused on delivering custom web, mobile, and business management solutions. Work directly with clients and lead projects from requirements gathering through development and deployment.' },
    { when:'2025 – 2026', t:'Nexl Tech', org:'Agentic AI & Full-Stack Developer', d:'Worked full-time with a primary focus on Agentic AI development, designing and implementing intelligent AI-powered workflows and solutions. Also contributed to web and mobile applications, integrating AI into practical software products.' },
    { when:'6-Month Internship', t:'NETSOL Technologies', org:'Software Developer Intern', d:'Worked on full-stack web application development, LLM integration and AI-related functionality, while gaining hands-on experience with the Software Development Life Cycle (SDLC) and professional software engineering practices.' }
  ],

  skills: [
    { t:'AI & Agentic AI', icon:'brain', tone:'purple', items:[
      ['Python','Py'],['LLMs','LLM'],['LangChain','Lc'],['LangGraph','Lg'],
      ['AI Agents','Ag'],['Generative AI','Gen'],['LLM Integration','Int'],['AI Workflows','Wf']
    ]},
    { t:'Frontend Development', icon:'code', tone:'teal', items:[
      ['React.js','⚛'],['JavaScript','JS'],['HTML5','5'],['CSS3','CSS'],['Tailwind CSS','Tw'],['Bootstrap','Bs']
    ]},
    { t:'Backend & APIs', icon:'boxes', tone:'brown', items:[
      ['Node.js','N'],['Express.js','Ex'],['FastAPI','Fa'],['Django','Dj'],['PHP','php'],['REST APIs','API']
    ]},
    { t:'Mobile Development', icon:'phone', tone:'purple', items:[
      ['React Native','RN'],['Expo','Ex'],['React Native CLI','CLI']
    ]},
    { t:'Databases & Backend Services', icon:'db', tone:'teal', items:[
      ['MongoDB','Mg'],['SQL','SQL'],['Firebase','Fb'],['Redis','Re'],['SQLite','Lite'],['Supabase','Sb'],['Google Cloud','GC']
    ]},
    { t:'DevOps & Cloud', icon:'spark', tone:'brown', items:[
      ['Docker','Dk'],['Git','Git'],['GitHub','GH'],['Google Cloud','GC']
    ]}
  ],

  products: [
    ['LangChain Agents','Hot','New'],['LangGraph Flows','Core'],['LLM Pipelines','Live'],
    ['FastAPI Backends','API'],['React Native Apps','Mobile'],['Docker Deploy','Cloud']
  ]
};
