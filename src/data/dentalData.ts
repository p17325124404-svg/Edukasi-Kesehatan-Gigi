import { BrushingZone, AnatomyPart, QuizQuestion, GuideArticle, Badge } from '../types/dental';

export const BRUSHING_ZONES: BrushingZone[] = [
  {
    id: 1,
    name: 'Gigi Depan Atas (Bagian Luar)',
    section: 'Rahang Atas',
    duration: 20,
    instruction: 'Miringkan sikat gigi 45 derajat ke arah batas gusi. Gerakkan memutar melingkar lembut atau dari merah ke putih (gusi ke gigi).',
    tip: 'Jangan menekan terlalu keras ya! Lembut saja seperti membelai kelopak bunga.',
    zoneHighlight: 'top-outer'
  },
  {
    id: 2,
    name: 'Gigi Geraham Atas (Kiri & Kanan)',
    section: 'Rahang Atas',
    duration: 20,
    instruction: 'Sikat sisi luar gigi geraham atas bagian kiri dan kanan dengan gerakan melingkar lembut hingga ke gigi paling belakang.',
    tip: 'Gigi geraham punya banyak celah yang disukai kuman sisa makanan.',
    zoneHighlight: 'top-outer'
  },
  {
    id: 3,
    name: 'Sisi Dalam Gigi Atas',
    section: 'Rahang Atas',
    duration: 20,
    instruction: 'Buka mulut sedikit lebih lebar. Posisikan sikat agak tegak untuk menyikat bagian belakang gigi depan dan sisi dalam geraham atas.',
    tip: 'Tarik sikat dari arah gusi ke ujung gigi untuk mengangkat plak.',
    zoneHighlight: 'top-inner'
  },
  {
    id: 4,
    name: 'Gigi Depan & Samping Bawah (Bagian Luar)',
    section: 'Rahang Bawah',
    duration: 20,
    instruction: 'Sikat bagian luar gigi bawah dari arah gusi bawah ke atas dengan sapuan lembut melingkar.',
    tip: 'Pastikan bulu sikat menjangkau perbatasan antara gigi dan gusi.',
    zoneHighlight: 'bottom-outer'
  },
  {
    id: 5,
    name: 'Sisi Dalam Gigi Bawah',
    section: 'Rahang Bawah',
    duration: 20,
    instruction: 'Gunakan ujung sikat dalam posisi vertikal untuk menyikat sisi dalam gigi depan bawah yang sering menjadi tempat karang gigi.',
    tip: 'Di belakang gigi depan bawah terdapat muara kelenjar air liur, jadi rajinlah menyikatnya.',
    zoneHighlight: 'bottom-inner'
  },
  {
    id: 6,
    name: 'Permukaan Kunyah (Atas & Bawah)',
    section: 'Permukaan Kunyah',
    duration: 15,
    instruction: 'Gosok permukaan datar gigi geraham atas dan bawah dengan gerakan maju-mundur secara merata.',
    tip: 'Permukaan ini memiliki lekukan dalam (fissure) tempat sisa makanan suka bersembunyi.',
    zoneHighlight: 'top-chewing'
  },
  {
    id: 7,
    name: 'Sikat Punggung Lidah & Bilas',
    section: 'Lidah & Mulut',
    duration: 15,
    instruction: 'Sikat perlahan permukaan lidah dari belakang ke depan, lalu buang busa pasta gigi dan kumur secukupnya.',
    tip: 'Sebagian besar kuman penyebab bau mulut tinggal di lapisan putih lidah!',
    zoneHighlight: 'tongue'
  }
];

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'enamel',
    name: 'Email Gigi (Enamel)',
    latinName: 'Substantia Adamantina',
    descriptionChild: 'Perisai terluar gigi yang berwarna putih berkilau! Ini bagian tubuh paling keras, bahkan lebih keras dari tulang kita.',
    descriptionTeen: 'Lapisan kalsium hidroksiapatit transparan dan paling keras di tubuh manusia. Menahan gesekan makanan dan asam bakteri, namun tidak memiliki sel hidup sehingga tidak bisa regenerasi sendiri jika berlubang.',
    function: 'Melindungi lapisan dalam gigi dari gesekan, benturan, dan asam kuman.',
    funFact: 'Email gigi terdiri dari 96% mineral murni! Menjaganya dengan fluoride membuatnya tahan terhadap serangan asam.',
    color: '#38bdf8',
    vulnerability: 'Dapat larut oleh asam dari gula dan minuman bersoda (demineralisasi).'
  },
  {
    id: 'dentin',
    name: 'Dentin (Tulang Gigi)',
    latinName: 'Substantia Eburnea',
    descriptionChild: 'Lapisan kuning di bawah perisai email. Di dalamnya ada ribuan lorong kecil yang terhubung langsung ke saraf gigi.',
    descriptionTeen: 'Jaringan keras berpori di bawah enamel yang memiliki jutaan tubulus mikroskopis berisi cairan. Ketika enamel terkikis, rangsangan suhu (es atau air panas) merambat ke saraf dan menyebabkan gigi sensitif/ngilu.',
    function: 'Menopang email gigi dan menyerap tekanan kunyah agar gigi tidak mudah retak.',
    funFact: 'Warna asli dentin agak kekuningan. Warna putih alami senyum kita dipengaruhi oleh perpaduan enamel transparan dan dentin ini.',
    color: '#fbbf24',
    vulnerability: 'Lebih lunak dari email, sehingga karies berkembang lebih cepat jika sudah menembus dentin.'
  },
  {
    id: 'pulpa',
    name: 'Pulpa Gigi (Saraf & Pembuluh)',
    latinName: 'Pulpa Dentis',
    descriptionChild: 'Hati dan nyawa dari gigi! Di sinilah tempat selaput darah segar dan serabut saraf yang merasakan hangat, dingin, dan rasa sakit.',
    descriptionTeen: 'Rongga terdalam yang berisi jaringan ikat lunak, pembuluh darah kapiler pembawa nutrisi, serta serabut saraf trigeminal. Jika bakteri karies mencapai pulpa, timbul pulpitis dengan rasa nyeri berdenyut parah (sakit gigi).',
    function: 'Memberi nutrisi pada gigi agar tetap hidup serta memberikan sinyal sensorik rasa.',
    funFact: 'Gigi yang pulpanya mati melalui perawatan saluran akar (root canal) masih bisa dipakai bertahun-tahun di dalam mulut.',
    color: '#f43f5e',
    vulnerability: 'Sangat rentan infeksi bakteri yang menyebabkan rasa sakit berdenyut dan abses nanah.'
  },
  {
    id: 'gusi',
    name: 'Gusi (Gingiva)',
    latinName: 'Gingiva',
    descriptionChild: 'Bantal merah muda yang lembut dan memeluk leher gigimu dengan erat agar bakteri nakal tidak bisa masuk ke dalam akar.',
    descriptionTeen: 'Jaringan mukosa penyokong gigi yang sehat berwarna merah muda pucat dan berkontur seperti kulit jeruk (stippling). Radang gusi (gingivitis) ditandai dengan bengkak dan mudah berdarah saat sikat gigi.',
    function: 'Menyegel leher gigi dan melindungi tulang alveolar penyangga gigi dari invasi bakteri mulut.',
    funFact: 'Gusi berdarah saat menyikat gigi bukan tanda harus berhenti menyikat, melainkan tanda plak menumpuk dan butuh pembersihan teratur!',
    color: '#fb7185',
    vulnerability: 'Bisa meradang jika plak dan karang gigi (tartar) tidak dibersihkan secara berkala.'
  },
  {
    id: 'akar',
    name: 'Akar Gigi & Sementum',
    latinName: 'Radix Dentis',
    descriptionChild: 'Bagian bawah gigi yang tersembunyi kuat di dalam gusi, seperti akar pohon yang mencengkeram tanah dengan kokoh.',
    descriptionTeen: 'Struktur berbentuk pasak yang menancap pada soket tulang rahang, dilapisi lapisan tipis sementum dan diikat oleh serat kolagen ligamen periodontal yang bertindak sebagai peredam kejut saat mengunyah.',
    function: 'Mengunci gigi di dalam rahang dan mendistribusikan beban tekanan kunyah ke tulang alveolar.',
    funFact: 'Gigi geraham memiliki 2 hingga 3 akar cabang yang sangat kuat untuk melumat makanan yang keras.',
    color: '#a3e635',
    vulnerability: 'Dapat goyang jika terjadi periodontitis berat akibat karang gigi yang masuk terlalu dalam.'
  }
];

export const DECAY_STAGES = [
  {
    stage: 1,
    title: 'Tahap 1: Bintik Putih (White Spot)',
    subtitle: 'Enamel Mengalami Demineralisasi',
    description: 'Asam dari kuman mulai mengikis mineral kalsium email. Tampak bercak putih kusam tanpa lubang nyata.',
    symptoms: 'Belum ada rasa sakit sama sekali.',
    treatment: 'Bisa disembuhkan dan dikembalikan (remineralisasi) dengan menyikat gigi pakai pasta gigi berfluoride dan kurangi gula!'
  },
  {
    stage: 2,
    title: 'Tahap 2: Karies Email (Lubang Kecil)',
    subtitle: 'Permukaan Email Berlubang',
    description: 'Lapisan terluar mulai jebol dan terbentuk lubang kecil berwarna cokelat atau kehitaman.',
    symptoms: 'Biasanya belum sakit, kadang makanan mulai sering tersangkut.',
    treatment: 'Perlu ditambal sederhana oleh dokter gigi sebelum lubang menembus lapisan dalam.'
  },
  {
    stage: 3,
    title: 'Tahap 3: Karies Dentin (Lubang Menengah)',
    subtitle: 'Lubang Mencapai Tulang Gigi',
    description: 'Kuman berhasil menembus enamel dan merusak dentin yang lebih lunak. Lubang makin melebar dan berongga.',
    symptoms: 'Gigi mulai terasa ngilu tajam saat minum es dingin, makan manis, atau menyeruput kuah hangat.',
    treatment: 'Harus segera dibersihkan dan ditambal oleh dokter gigi agar tidak mengenai saraf pulpa.'
  },
  {
    stage: 4,
    title: 'Tahap 4: Infeksi Pulpa & Abses',
    subtitle: 'Kuman Menyerang Saraf Gigi',
    description: 'Kuman masuk ke rongga saraf (pulpa). Terjadi radang parah, pembengkakan, dan pembentukan nanah di ujung akar.',
    symptoms: 'Sakit gigi hebat berdenyut spontan, terutama di malam hari, gusi bisa membengkak dan pipi ikut pegal.',
    treatment: 'Perlu perawatan saluran akar (PSA) atau pencabutan gigi jika struktur mahkota sudah habis.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    mode: 'all',
    category: 'sikat',
    question: 'Berapa durasi waktu minimal yang dianjurkan dokter gigi saat menyikat gigi?',
    options: ['30 detik', '1 menit', '2 menit', '5 menit'],
    correctIndex: 2,
    explanation: 'Waktu yang tepat adalah 2 menit (120 detik) agar semua permukaan gigi—luar, dalam, dan kunyah—bersih dari plak secara merata.'
  },
  {
    id: 2,
    mode: 'all',
    category: 'kebiasaan',
    question: 'Kapan dua waktu paling penting untuk menyikat gigi setiap hari?',
    options: [
      'Pagi sebelum sarapan & sore hari',
      'Pagi setelah sarapan & malam sebelum tidur',
      'Siang hari & sore hari',
      'Hanya saat mandi pagi saja'
    ],
    correctIndex: 1,
    explanation: 'Sikat gigi pagi setelah sarapan membersihkan sisa makanan, dan sikat gigi malam sebelum tidur sangat penting karena saat tidur air liur berkurang sehingga kuman lebih aktif!'
  },
  {
    id: 3,
    mode: 'anak',
    category: 'makanan',
    question: 'Makanan manakah yang paling ramah dan membantu membersihkan gigi secara alami?',
    options: ['Permen gulali manis', 'Apel dan wortel renyah', 'Cokelat karamel lengket', 'Keripik gurih'],
    correctIndex: 1,
    explanation: 'Buah apel dan wortel yang renyah kaya akan serat dan air yang merangsang air liur serta menyeka kotoran gigi secara alami.'
  },
  {
    id: 4,
    mode: 'anak',
    category: 'anatomi',
    question: 'Apa nama bagian terluar gigi kita yang sangat keras dan melindungi gigi dari kuman?',
    options: ['Gusi', 'Email (Enamel)', 'Saraf', 'Lidah'],
    correctIndex: 1,
    explanation: 'Email gigi adalah lapisan perisai terluar yang paling keras di seluruh tubuh kita, bahkan lebih keras daripada tulang!'
  },
  {
    id: 5,
    mode: 'remaja',
    category: 'behel',
    question: 'Bagi pengguna kawat gigi (behel), alat bantu apa yang sangat dianjurkan untuk membersihkan sela bracket dan kawat?',
    options: [
      'Tusuk gigi kayu berujung tajam',
      'Sikat interdental dan dental floss khusus ortodonti',
      'Hanya berkumur air garam',
      'Cukup sikat gigi biasa 10 detik'
    ],
    correctIndex: 1,
    explanation: 'Sikat interdental memiliki bulu kecil berbentuk cemara yang dirancang khusus masuk ke sela kawat dan bracket yang tidak terjangkau sikat gigi biasa.'
  },
  {
    id: 6,
    mode: 'remaja',
    category: 'kebiasaan',
    question: 'Apa penyebab utama masalah bau mulut (halitosis) yang sering tidak disadari?',
    options: [
      'Bakteri penghasil belerang di punggung lidah dan karang gigi',
      'Terlalu banyak minum air putih',
      'Bernapas lewat hidung',
      'Makan buah pepaya'
    ],
    correctIndex: 0,
    explanation: 'Sekitar 85-90% bau mulut bersumber dari mulut, terutama penumpukan bakteri anaerob penghasil senyawa sulfur di permukaan lidah dan saku gusi berkarang.'
  },
  {
    id: 7,
    mode: 'all',
    category: 'kebiasaan',
    question: 'Berapa bulan sekali kita sebaiknya memeriksakan gigi ke dokter gigi meskipun tidak merasa sakit?',
    options: ['1 bulan sekali', '6 bulan sekali', '3 tahun sekali', 'Hanya jika gigi sudah berlubang besar'],
    correctIndex: 1,
    explanation: 'Pemeriksaan rutin setiap 6 bulan sekali membantu dokter gigi mendeteksi karang gigi dan lubang mikro sebelum berkembang menjadi masalah parah.'
  },
  {
    id: 8,
    mode: 'remaja',
    category: 'anatomi',
    question: 'Rasa ngilu saat makan es atau minum manis biasanya terjadi karena rangsangan mencapai bagian mana?',
    options: ['Email gigi yang tidak berpori', 'Tubulus dentin yang terbuka', 'Bibir bagian dalam', 'Langit-langit mulut'],
    correctIndex: 1,
    explanation: 'Dentin memiliki jutaan tubulus berisi cairan yang menghantarkan rangsang dingin atau manis langsung ke serabut saraf di pulpa jika enamelnya menipis.'
  }
];

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    id: 'sikat-teknik-benar',
    title: 'Cara Menyikat Gigi yang Tepat (Teknik Modifikasi Bass)',
    category: 'kebiasaan',
    mode: 'all',
    summary: 'Menyikat gigi bukan sekadar menggosok keras-keras ke kiri dan kanan. Pelajari sudut 45 derajat yang menyelamatkan gusimu!',
    content: [
      'Banyak orang mengira semakin keras menyikat, gigi semakin bersih. Padahal, gesekan horizontal yang terlalu keras justru mengikis leher gigi (abrasi) dan membuat gusi melorot (resesi gusi).',
      'Pegang sikat seperti memegang pensil. Letakkan bulu sikat dengan sudut 45 derajat di perbatasan gigi dan gusi.',
      'Lakukan getaran kecil melingkar atau sapuan dari arah gusi ke ujung mahkota gigi (merah ke putih).',
      'Gunakan pasta gigi berfluoride seukuran biji kacang polong (pea-sized) untuk remaja dan anak di atas 6 tahun, atau sebutir beras untuk balita.',
      'Setelah selesai, ludahkan busa odol, kumur ringan satu kali saja agar lapisan fluoride tetap menempel melindungi email gigi.'
    ],
    tags: ['Teknik Sikat', 'Fluoride', 'Cegah Gusi Turun'],
    tips: [
      'Ganti sikat gigimu setiap 3 bulan sekali atau saat bulu sikat sudah mulai mekar.',
      'Pilih sikat dengan bulu lembut (soft bristles) dan kepala sikat yang ramping.'
    ]
  },
  {
    id: 'kawat-gigi-behel',
    title: 'Panduan Keren Merawat Kawat Gigi (Behel) untuk Remaja',
    category: 'behel',
    mode: 'remaja',
    summary: 'Pakai behel bikin senyum makin rapi, tapi butuh perhatian ekstra agar tidak meninggalkan bercak putih atau karang gigi tebal.',
    content: [
      'Bracket dan kawat ortodonti menjadi perangkap alami untuk sisa makanan dan plak. Jika tidak dibersihkan dengan teliti, bakteri akan membentuk bercak putih (white spot lesion) yang permanen setelah behel dilepas.',
      'Gunakan sikat gigi khusus ortodonti dengan alur V di tengahnya yang pas di atas bracket.',
      'Gunakan sikat interdental untuk membersihkan ruang di bawah kawat lengkung dan di sekeliling tiap bracket.',
      'Gunakan dental floss dengan bantuan threader khusus ortodonti minimal sekali sehari sebelum tidur.',
      'Jika kawat atau bracket menusuk pipi dalam, tempelkan sedikit orthodontic wax (lilin behel) pada ujung yang tajam.'
    ],
    tags: ['Kawat Gigi', 'Sikat Interdental', 'Orthodontic Wax'],
    tips: [
      'Hindari makanan super lengket seperti permen karamel atau permen karet yang bisa melepas lem bracket.',
      'Jangan menggigit makanan keras langsung dengan gigi depan; potong apel atau jagung menjadi potongan kecil sebelum dikunyah.'
    ]
  },
  {
    id: 'bau-mulut-halitosis',
    title: 'Bebas Bau Mulut: Percaya Diri Ngobrol dengan Teman',
    category: 'masalah',
    mode: 'remaja',
    summary: 'Kenali penyebab bau mulut yang sebenarnya dan trik praktis menjaga napas segar sepanjang hari.',
    content: [
      'Bau mulut atau halitosis bukan berasal dari perut pada kebanyakan kasus, melainkan dari bakteri anaerob di dalam mulut yang memecah sisa protein menjadi gas belerang berbau menyengat (VSC).',
      'Tempat favorit bakteri ini adalah celah di permukaan lidah dan sela-sela gigi yang tidak pernah dibersihkan dengan benang gigi.',
      'Mulut yang kering (kurang minum atau bernapas lewat mulut saat tidur) memicu perkembangbiakan bakteri karena air liur berkurang.',
      'Minuman manis, kopi, dan makanan berbau tajam seperti bawang juga memperberat aroma napas.'
    ],
    tags: ['Halitosis', 'Pembersih Lidah', 'Napas Segar'],
    tips: [
      'Sikat lidahmu setiap kali selesai menyikat gigi dengan pembersih lidah atau bulu sikat lembut.',
      'Minum air putih minimal 8 gelas sehari untuk menjaga aliran saliva alami yang membersihkan mulut.',
      'Lakukan pembersihan karang gigi (scaling) di dokter gigi setiap 6 bulan.'
    ]
  },
  {
    id: 'sahabat-dan-musuh-gigi',
    title: 'Pasukan Sahabat Gigi vs Monster Perusak Gigi',
    category: 'makanan',
    mode: 'anak',
    summary: 'Kenalan dengan makanan lezat yang bikin gigi makin kuat dan makanan manis yang disukai kuman nakal!',
    content: [
      'Setiap kali kita makan makanan manis seperti permen atau boba, kuman kecil di mulut kita berpesta! Kuman ini memakan gula lalu mengeluarkan cairan asam yang bisa membuat gigi kita berlubang.',
      'Sahabat Gigi adalah makanan yang kaya kalsium dan serat: susu putih yang membuat gigi kokoh, keju yang menetralkan asam, serta buah apel dan wortel yang renyah.',
      'Ketika mengunyah apel renyah, serat buahnya seperti sapu kecil yang membersihkan kotoran gigi!',
      'Air putih adalah pahlawan pembilas yang paling hebat setelah kita makan.'
    ],
    tags: ['Keluarga Gigi', 'Camilan Sehat', 'Kuman Plak'],
    tips: [
      'Setelah makan kue atau es krim, segera minum air putih dan berkumur.',
      'Jangan tidur sambil minum susu manis dari botol dot karena gula bisa menggenangi gigi semalaman.'
    ]
  },
  {
    id: 'kapan-ke-dokter-gigi',
    title: 'Kapan Waktu Tepat Pergi ke Dokter Gigi?',
    category: 'fakta',
    mode: 'all',
    summary: 'Jangan tunggu sampai pipi bengkak dan menangis karena sakit gigi! Ketahui tanda-tanda awal.',
    content: [
      'Banyak orang baru datang ke klinik gigi saat rasa sakit sudah tak tertahankan. Padahal, lubang kecil jauh lebih mudah, cepat, dan tidak sakit untuk dirawat!',
      'Periksakan gigi secara teratur setiap 6 bulan sekali.',
      'Tanda kamu harus segera ke dokter gigi:',
      '1. Muncul rasa ngilu saat makan makanan manis, dingin, atau hangat.',
      '2. Gusi sering berdarah saat menyikat gigi.',
      '3. Ada titik hitam atau cokelat pada lekukan gigi.',
      '4. Makanan selalu menyangkut di tempat yang sama.',
      '5. Bau mulut yang tidak kunjung hilang meskipun sudah sikat gigi.'
    ],
    tags: ['Dokter Gigi', 'Checkup 6 Bulan', 'Deteksi Dini'],
    tips: [
      'Kunjungan rutin ke dokter gigi biasanya hanya pemeriksaan ringan dan pembersihan karang gigi yang santai dan nyaman!'
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_brush',
    name: 'Senyum Pertama',
    description: 'Menyelesaikan simulasi sikat gigi 2 menit pertamamu!',
    icon: '✨',
    requiredDays: 1,
    unlocked: true
  },
  {
    id: 'streak_3',
    name: 'Gigi Kinclong 3 Hari',
    description: 'Menyikat gigi teratur pagi dan malam selama 3 hari berturut-turut.',
    icon: '⭐',
    requiredDays: 3,
    unlocked: false
  },
  {
    id: 'streak_7',
    name: 'Pahlawan Senyum Sepekan',
    description: 'Menyelesaikan tantangan sikat gigi 7 hari berturut-turut!',
    icon: '🏆',
    requiredDays: 7,
    unlocked: false
  },
  {
    id: 'quiz_master',
    name: 'Detektif Gigi Pintar',
    description: 'Berhasil menjawab semua soal Kuis Kesehatan Gigi dengan benar.',
    icon: '🎓',
    requiredDays: 0,
    unlocked: false
  }
];
