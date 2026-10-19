import type { ExamLevel, WritingTopic } from "@/lib/types";

/** Seed bank: Cambridge-style Part 1 essay prompts (C1 + C2). */
export const SEED_TOPICS: WritingTopic[] = [
  // —— C1 Advanced ——
  {
    id: "c1-01",
    level: "C1",
    title: "Remote work and cities",
    source: "seed",
    prompt:
      "Your class has watched a documentary about how remote work is changing city centres. You have made the notes below.\n\nNotes\n• empty offices\n• local shops and cafés\n• community life\n• transport and pollution\n\nWrite an essay discussing two of the points in your notes. You should explain which point is more significant for the future of cities, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the documentary, but you should use your own words as far as possible.",
  },
  {
    id: "c1-02",
    level: "C1",
    title: "Lifelong learning",
    source: "seed",
    prompt:
      "Your class has attended a lecture on lifelong learning. You have made the notes below.\n\nNotes\n• career changes\n• online courses\n• cost of education\n• motivation and free time\n\nWrite an essay discussing two of the points in your notes. You should explain which factor is more important for adults who want to keep learning, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the lecture, but you should use your own words as far as possible.",
  },
  {
    id: "c1-03",
    level: "C1",
    title: "Fast fashion",
    source: "seed",
    prompt:
      "Your class has watched a TV debate about fast fashion. You have made the notes below.\n\nNotes\n• environmental damage\n• workers’ rights\n• consumer habits\n• affordable clothing\n\nWrite an essay discussing two of the points in your notes. You should explain which issue should be prioritised by governments, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the debate, but you should use your own words as far as possible.",
  },
  {
    id: "c1-04",
    level: "C1",
    title: "Public libraries",
    source: "seed",
    prompt:
      "Your class has attended a talk about the future of public libraries. You have made the notes below.\n\nNotes\n• digital resources\n• community spaces\n• funding\n• literacy programmes\n\nWrite an essay discussing two of the points in your notes. You should explain which role of libraries is most valuable today, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the talk, but you should use your own words as far as possible.",
  },
  {
    id: "c1-05",
    level: "C1",
    title: "Tourism and heritage",
    source: "seed",
    prompt:
      "Your class has watched a documentary about tourism in historic cities. You have made the notes below.\n\nNotes\n• economic benefits\n• overcrowding\n• cultural authenticity\n• infrastructure\n\nWrite an essay discussing two of the points in your notes. You should explain which challenge is more urgent for city authorities, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the documentary, but you should use your own words as far as possible.",
  },
  {
    id: "c1-06",
    level: "C1",
    title: "Social media and news",
    source: "seed",
    prompt:
      "Your class has attended a lecture on how people get their news. You have made the notes below.\n\nNotes\n• speed of information\n• misinformation\n• traditional journalism\n• personalised feeds\n\nWrite an essay discussing two of the points in your notes. You should explain which development most affects public understanding of current events, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the lecture, but you should use your own words as far as possible.",
  },
  {
    id: "c1-07",
    level: "C1",
    title: "Urban green spaces",
    source: "seed",
    prompt:
      "Your class has watched a panel discussion about parks and green spaces in cities. You have made the notes below.\n\nNotes\n• mental and physical health\n• biodiversity\n• housing pressure\n• equal access\n\nWrite an essay discussing two of the points in your notes. You should explain which argument is strongest for protecting urban green spaces, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the discussion, but you should use your own words as far as possible.",
  },
  {
    id: "c1-08",
    level: "C1",
    title: "Artificial intelligence at work",
    source: "seed",
    prompt:
      "Your class has attended a seminar on AI in the workplace. You have made the notes below.\n\nNotes\n• productivity\n• job security\n• skills training\n• ethics and bias\n\nWrite an essay discussing two of the points in your notes. You should explain which issue employers should address first, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the seminar, but you should use your own words as far as possible.",
  },
  {
    id: "c1-09",
    level: "C1",
    title: "School sport",
    source: "seed",
    prompt:
      "Your class has watched a documentary about sport in secondary schools. You have made the notes below.\n\nNotes\n• health benefits\n• competition vs participation\n• funding and facilities\n• academic pressure\n\nWrite an essay discussing two of the points in your notes. You should explain which factor most influences whether young people stay active, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the documentary, but you should use your own words as far as possible.",
  },
  {
    id: "c1-10",
    level: "C1",
    title: "Food waste",
    source: "seed",
    prompt:
      "Your class has attended a talk about food waste. You have made the notes below.\n\nNotes\n• household habits\n• supermarket practices\n• restaurant waste\n• education campaigns\n\nWrite an essay discussing two of the points in your notes. You should explain which approach is more effective in reducing food waste, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the talk, but you should use your own words as far as possible.",
  },
  {
    id: "c1-11",
    level: "C1",
    title: "Public transport",
    source: "seed",
    prompt:
      "Your class has watched a debate about improving public transport. You have made the notes below.\n\nNotes\n• ticket prices\n• reliability and frequency\n• environmental impact\n• accessibility\n\nWrite an essay discussing two of the points in your notes. You should explain which improvement would most encourage people to leave their cars at home, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the debate, but you should use your own words as far as possible.",
  },
  {
    id: "c1-12",
    level: "C1",
    title: "Volunteer work",
    source: "seed",
    prompt:
      "Your class has attended a lecture on volunteering. You have made the notes below.\n\nNotes\n• personal development\n• community impact\n• time pressures\n• recognition and incentives\n\nWrite an essay discussing two of the points in your notes. You should explain which factor most affects people’s willingness to volunteer, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the lecture, but you should use your own words as far as possible.",
  },
  {
    id: "c1-13",
    level: "C1",
    title: "Streaming and cinema",
    source: "seed",
    prompt:
      "Your class has watched a discussion about streaming services and cinemas. You have made the notes below.\n\nNotes\n• convenience\n• social experience\n• support for filmmakers\n• ticket and subscription costs\n\nWrite an essay discussing two of the points in your notes. You should explain which factor will most shape the future of film-watching, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the discussion, but you should use your own words as far as possible.",
  },
  {
    id: "c1-14",
    level: "C1",
    title: "Plastic packaging",
    source: "seed",
    prompt:
      "Your class has attended a seminar on plastic packaging. You have made the notes below.\n\nNotes\n• consumer convenience\n• recycling systems\n• alternative materials\n• business costs\n\nWrite an essay discussing two of the points in your notes. You should explain which action would reduce plastic waste most effectively, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the seminar, but you should use your own words as far as possible.",
  },
  {
    id: "c1-15",
    level: "C1",
    title: "Gap years",
    source: "seed",
    prompt:
      "Your class has watched a talk about gap years before university. You have made the notes below.\n\nNotes\n• maturity and independence\n• cost and inequality\n• delayed studies\n• skills and employability\n\nWrite an essay discussing two of the points in your notes. You should explain whether gap years are generally a good idea, giving reasons to support your opinion.\n\nYou may, if you wish, make use of the opinions expressed in the talk, but you should use your own words as far as possible.",
  },

  // —— C2 Proficiency ——
  {
    id: "c2-01",
    level: "C2",
    title: "Truth in the digital age",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nIn an age of instant publication, factual accuracy often loses out to speed. Social platforms reward engagement, not verification, and audiences rarely pause to check sources. Traditional newsrooms still matter, but their business models are under pressure, leaving fewer journalists to investigate complex stories.\n\nText 2\nTechnology is not the enemy of truth; it can amplify fact-checking and open archives to the public. The real failure is educational: citizens have not been taught to interrogate claims. If media literacy became a core skill, digital tools could strengthen rather than weaken public debate.",
  },
  {
    id: "c2-02",
    level: "C2",
    title: "Work and identity",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nFor many people, work is no longer merely a means of survival; it is the main stage on which identity is performed. Career titles signal status, and unemployment can feel like a personal failure rather than an economic condition. This fusion of self and job makes modern life brittle.\n\nText 2\nIdentifying too closely with paid work is a cultural habit, not a necessity. Communities that value caregiving, craft and civic life show that fulfilment can sit outside the office. Shorter working weeks and portable skills may finally loosen the grip of the career script.",
  },
  {
    id: "c2-03",
    level: "C2",
    title: "Cities and solitude",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nDense cities promise connection yet deliver anonymity. Neighbours remain strangers, and digital networks replace local ties. Loneliness in urban centres is not a paradox; it is the predictable outcome of design that prioritises efficiency over encounter.\n\nText 2\nCities also offer choice: clubs, libraries, classes and chance meetings unavailable in smaller towns. Solitude becomes harmful mainly when public spaces are neglected. Investment in parks, transit and cultural venues can turn density into belonging rather than isolation.",
  },
  {
    id: "c2-04",
    level: "C2",
    title: "Science communication",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nScientists often assume that clearer data will settle public disputes. In practice, people filter evidence through identity and trust. Simply publishing more papers does little if institutions appear remote or self-interested.\n\nText 2\nSimplifying science for mass audiences risks distortion, yet refusing to engage leaves the field to influencers. The task is not to dilute complexity but to narrate uncertainty honestly, showing how knowledge advances without pretending every question is closed.",
  },
  {
    id: "c2-05",
    level: "C2",
    title: "Heritage and progress",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nPreserving historic buildings can freeze cities in nostalgia, blocking housing and infrastructure that current residents need. Heritage lobbies sometimes defend privilege dressed as culture, while younger generations inherit unaffordable, impractical urban forms.\n\nText 2\nErasing the past impoverishes collective memory and tourism alike. Sensitive reuse — adapting old structures for new purposes — shows that conservation and progress need not collide. What matters is selective protection guided by public value, not blanket resistance to change.",
  },
  {
    id: "c2-06",
    level: "C2",
    title: "Attention economy",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nModern platforms treat human attention as a raw material to be mined. Endless feeds train restlessness, fragment deep work and reshape what counts as entertainment. Individuals are told to practise self-control while products are engineered to defeat it.\n\nText 2\nBlaming technology alone ignores agency and culture. People have always sought distraction; what has changed is scale. Regulation of addictive design, together with education about focus, can restore balance without romanticising a pre-digital past that never truly existed.",
  },
  {
    id: "c2-07",
    level: "C2",
    title: "Global English",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nEnglish as a global lingua franca opens doors in science, business and travel, yet it also deepens inequality. Those without early access to high-quality English education face barriers that have little to do with talent.\n\nText 2\nA shared language reduces friction and enables collaboration across borders. The answer is not to abandon English but to fund multilingual education and recognise diverse accents and varieties, so that the lingua franca becomes a bridge rather than a gate.",
  },
  {
    id: "c2-08",
    level: "C2",
    title: "Automation and craft",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nAutomation promises efficiency but threatens the knowledge embedded in skilled trades. When machines replace apprenticeships, societies lose tacit expertise that cannot be fully captured in code.\n\nText 2\nHistory suggests technology transforms labour more often than it abolishes meaning. New crafts emerge around maintaining, designing and humanising automated systems. The ethical duty is to manage transition fairly, not to reject tools that can free people from dangerous or repetitive work.",
  },
  {
    id: "c2-09",
    level: "C2",
    title: "Climate and individual action",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nEmphasising personal carbon footprints distracts from the corporations and policies that dominate emissions. Individuals cannot recycle their way out of a systemic crisis, and guilt is a poor substitute for regulation.\n\nText 2\nCollective change still depends on habits, votes and social norms. Personal choices signal demand, build political will and make large-scale measures easier to accept. Framing climate action as either individual or structural is a false choice.",
  },
  {
    id: "c2-10",
    level: "C2",
    title: "Privacy after data",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nPrivacy has become a luxury good. Those with time and money can minimise tracking; everyone else trades data for convenience and access. Legal frameworks lag behind business models built on surveillance.\n\nText 2\nAbsolute privacy was always unevenly distributed. What is new is the possibility of default protections — encryption, data minimisation and meaningful consent — that raise the floor for all users. Technology policy can democratise privacy rather than treat it as an elite preference.",
  },
  {
    id: "c2-11",
    level: "C2",
    title: "Universities under pressure",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nUniversities are asked to be engines of employability, research factories and moral communities at once. Expanding access without expanding funding produces overcrowded courses and anxious graduates who question the value of their degrees.\n\nText 2\nHigher education still transforms life chances when it cultivates critical thought, not merely job credentials. The solution is clearer purpose and fairer funding, not nostalgia for an exclusive past. A society that underinvests in learning underinvests in its future capacity.",
  },
  {
    id: "c2-12",
    level: "C2",
    title: "Sport and nationhood",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nInternational sport manufactures national emotion on demand. Flags, anthems and medal tables turn athletes into symbols, often at the cost of their welfare and of honest conversation about inequality within nations.\n\nText 2\nShared sporting moments can also create belonging across class and region, giving people a peaceful language for pride. The problem is not emotion itself but exploitation: commercial and political interests that forget the human beings behind the jersey.",
  },
  {
    id: "c2-13",
    level: "C2",
    title: "Ageing societies",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nLongevity without redesign of work, housing and care will strain younger generations. Pension systems built for shorter lives are colliding with demographic reality, and political debate still treats ageing as a distant problem.\n\nText 2\nOlder adults are not merely a cost; they are carers, workers and repositories of experience. Societies that enable longer participation — flexible careers, accessible cities, lifelong learning — can turn longevity into an asset rather than a crisis narrative.",
  },
  {
    id: "c2-14",
    level: "C2",
    title: "Art and public funding",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nPublic money spent on the arts is often attacked as elitist when hospitals and schools need funds. If culture cannot survive in the market, perhaps it lacks sufficient public demand to justify subsidy.\n\nText 2\nMarkets alone favour what is already popular, starving experimentation and regional scenes. Modest public investment expands who can make and access art, enriching civic life in ways that ticket sales never fully measure.",
  },
  {
    id: "c2-15",
    level: "C2",
    title: "Travel and responsibility",
    source: "seed",
    prompt:
      "Write an essay summarising and evaluating the key points from both texts below. Use your own words throughout as far as possible, and include your own ideas in your answers.\n\nText 1\nCheap flights democratised travel but exported congestion, carbon and cultural friction to destinations ill-equipped to host endless visitors. The right to roam is colliding with the rights of residents to a liveable place.\n\nText 2\nContact between cultures still educates and softens prejudice. The task is better management — quotas, local benefit, slower travel — not a return to mobility reserved for the wealthy. Responsibility can coexist with curiosity.",
  },
];

export function getSeedTopicsByLevel(level: ExamLevel): WritingTopic[] {
  return SEED_TOPICS.filter((t) => t.level === level);
}

export function getSeedTopicById(id: string): WritingTopic | undefined {
  return SEED_TOPICS.find((t) => t.id === id);
}

export function pickRandomSeedTopic(level: ExamLevel): WritingTopic {
  const pool = getSeedTopicsByLevel(level);
  return pool[Math.floor(Math.random() * pool.length)]!;
}
