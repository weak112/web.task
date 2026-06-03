const mockMovies = [
  {
    id: 'movie_1',
    title: '星际穿越',
    type: 'movie',
    category: '科幻',
    year: 2014,
    rating: 9.4,
    poster: 'assets/images/ims (2).webp',
    description: '一队探险家利用他们针对虫洞的新发现，超越人类对于太空旅行的极限，从而开始在广袤的宇宙中进行星际航行的故事。',
    director: '克里斯托弗·诺兰',
    actors: ['马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦'],
    duration: '169分钟',
    tags: ['科幻', '冒险', '剧情'],
    views: 125680,
    createdAt: '2024-01-15'
  },
  {
    id: 'movie_2',
    title: '盗梦空间',
    type: 'movie',
    category: '科幻',
    year: 2010,
    rating: 9.3,
    poster: 'assets/images/ims.webp',
    description: '一位专门从他人潜意识中盗取机密的窃贼，被赋予了一项几乎不可能完成的任务：将一个意念植入目标的潜意识。',
    director: '克里斯托弗·诺兰',
    actors: ['莱昂纳多·迪卡普里奥', '约瑟夫·高登-莱维特', '艾伦·佩吉'],
    duration: '148分钟',
    tags: ['科幻', '动作', '悬疑'],
    views: 98560,
    createdAt: '2024-02-20'
  },
  {
    id: 'movie_3',
    title: '肖申克的救赎',
    type: 'movie',
    category: '剧情',
    year: 1994,
    rating: 9.7,
    poster: 'assets/images/BHIADADIAJEBE-O8QYPOUbkK.png',
    description: '银行家安迪因被误判谋杀妻子和她的情夫而被判无期徒刑，进入肖申克监狱服刑。在狱中，他与瑞德成为好友，并展示了惊人的智慧和毅力。',
    director: '弗兰克·德拉邦特',
    actors: ['蒂姆·罗宾斯', '摩根·弗里曼'],
    duration: '142分钟',
    tags: ['剧情', '犯罪'],
    views: 156890,
    createdAt: '2024-01-10'
  },
  {
    id: 'movie_4',
    title: '千与千寻',
    type: 'movie',
    category: '动画',
    year: 2001,
    rating: 9.6,
    poster:  'assets/images/ims (1).webp',
    description: '10岁的千寻与父母误入了一个神秘的世界。她的父母因贪吃变成了猪，千寻必须在这个灵异世界中寻找拯救父母的方法。',
    director: '宫崎骏',
    actors: ['柊瑠美', '入野自由', '夏木真理'],
    duration: '125分钟',
    tags: ['动画', '奇幻', '冒险'],
    views: 134560,
    createdAt: '2024-03-01'
  },
  {
    id: 'movie_5',
    title: '泰坦尼克号',
    type: 'movie',
    category: '爱情',
    year: 1997,
    rating: 9.5,
    poster:  'assets/images/ims (3).webp',
    description: '1912年，豪华客轮泰坦尼克号开始了她的处女航，从英国驶向美国纽约。贵族少女露丝与穷画家杰克在船上相遇相爱，但一场巨大的灾难正在等待着他们。',
    director: '詹姆斯·卡梅隆',
    actors: ['莱昂纳多·迪卡普里奥', '凯特·温斯莱特'],
    duration: '194分钟',
    tags: ['爱情', '剧情', '灾难'],
    views: 189650,
    createdAt: '2024-02-15'
  },
  {
    id: 'movie_6',
    title: '疯狂动物城',
    type: 'movie',
    category: '动画',
    year: 2016,
    rating: 9.2,
    poster:  'assets/images/ims (4).webp',
    description: '在一个由拟人化动物居住的现代都市中，一只雄心勃勃的兔子警官朱迪与一只狡猾的狐狸尼克联手调查一起神秘的失踪案。',
    director: '拜伦·霍华德',
    actors: ['金妮弗·古德温', '杰森·贝特曼'],
    duration: '108分钟',
    tags: ['动画', '喜剧', '冒险'],
    views: 87650,
    createdAt: '2024-03-10'
  }
];

const mockMusic = [
  {
    id: 'music_1',
    title: 'In My Imagination',
    type: 'music',
    category: '流行',
    year: 2023,
    rating: 9.5,
    poster: 'assets/images/99843FC65AC2330206EB705236614B02.jpg',
    description: 'Devin Kennedy的经典歌曲，温柔治愈的旋律，让你沉醉在梦境里的美好想象中。',
    director: 'Devin Kennedy',
    actors: ['Devin Kennedy'],
    duration: '3分45秒',
    tags: ['流行', '欧美', '治愈'],
    views: 256890,
    createdAt: '2024-01-05'
  },
  {
    id: 'music_2',
    title: '稻香',
    type: 'music',
    category: '流行',
    year: 2008,
    rating: 9.8,
    poster: 'assets/images/A17B5B0A922812D50493443801E8B73E.jpg',
    description: '周杰伦的经典励志歌曲，收录于专辑《魔杰座》中。温暖的旋律，鼓励人们回归简单，珍惜当下。',
    director: '周杰伦',
    actors: ['周杰伦'],
    duration: '3分43秒',
    tags: ['流行', '华语', '励志'],
    views: 512560,
    createdAt: '2024-02-01'
  },
  {
    id: 'music_3',
    title: '七里香',
    type: 'music',
    category: '流行',
    year: 2004,
    rating: 9.4,
    poster: 'assets/images/07F98A4F4362E8FB7A5AA397E1666290.jpg',
    description: '周杰伦专辑《七里香》的同名主打歌，由方文山作词，周杰伦作曲，充满夏日浪漫气息。',
    director: '周杰伦',
    actors: ['周杰伦'],
    duration: '4分58秒',
    tags: ['流行', '华语', '浪漫'],
    views: 198650,
    createdAt: '2024-01-20'
  },
  {
    id: 'music_4',
    title: '半岛铁盒',
    type: 'music',
    category: '流行',
    year: 2001,
    rating: 9.7,
    poster: 'assets/images/7CC953B259ED8E018E4722A4A0672591.jpg',
    description: '周杰伦的经典歌曲，收录于专辑《范特西》中。温暖怀旧的旋律，勾起无数青春回忆。',
    director: '周杰伦',
    actors: ['周杰伦'],
    duration: '5分20秒',
    tags: ['流行', '华语', '怀旧'],
    views: 456890,
    createdAt: '2024-02-28'
  },
  {
    id: 'music_6',
    title: 'Rising Sun',
    type: 'music',
    category: '流行',
    year: 2020,
    rating: 9.2,
    poster: 'assets/images/2E335F7CFF522AEAC14920EA957F60A8.jpg',
    description: 'Ric Hassani的励志歌曲，充满希望和力量的旋律，像初升的太阳一样照亮你的每一天。',
    director: 'Ric Hassani',
    actors: ['Ric Hassani'],
    duration: '4分30秒',
    tags: ['流行', '欧美', '励志'],
    views: 267890,
    createdAt: '2024-03-12'
  }
];

const mockUsers = [
  {
    id: 'admin_1',
    email: 'admin@movieapp.com',
    username: '管理员',
    password: '123456',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    role: 'admin',
    createdAt: '2024-01-01',
    favorites: []
  }
];

function initMockData() {
  if (!getStorage(STORAGE_KEYS.CONTENTS)) {
    const allContents = [...mockMovies, ...mockMusic];
    saveContents(allContents);
  }
  
  if (!getStorage(STORAGE_KEYS.USERS)) {
    saveUsers(mockUsers);
  }
}
