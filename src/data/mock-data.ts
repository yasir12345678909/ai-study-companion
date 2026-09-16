import type { Subject, Chapter, Question, Material, PastPaper, TopicFrequency, StudyMission, Group, TutorMessage, User, Achievement, OnboardingStep, WritingFormat, Notification, FlowchartNode, FlowchartEdge, PastPaperQuestion } from '@/types'

export const demoUser: User = {
  id: 'u1',
  name: 'Ahmed Khan',
  email: 'ahmed@example.com',
  role: 'student',
  class: '10',
  xp: 450,
  level: 5,
  onboardingCompleted: false,
  onboardingStep: 0,
  avatarUrl: undefined
}

export const demoTeacher: User = {
  id: 't1',
  name: 'Mr. Asif Ahmed',
  email: 'asif@example.com',
  role: 'teacher',
  class: undefined,
  xp: 0,
  level: 1,
  onboardingCompleted: true,
  onboardingStep: 10,
  avatarUrl: undefined
}

export const demoAdmin: User = {
  id: 'a1',
  name: 'Dr. Sarah Khan',
  email: 'sarah@example.com',
  role: 'admin',
  class: undefined,
  xp: 0,
  level: 1,
  onboardingCompleted: true,
  onboardingStep: 10,
  avatarUrl: undefined
}

export const subjects: Subject[] = [
  { id: 's1', name: 'Physics', icon: 'atom', color: '#818cf8', chapterCount: 8, progress: 45, xp: 120 },
  { id: 's2', name: 'Mathematics', icon: 'calculator', color: '#f59e0b', chapterCount: 12, progress: 62, xp: 200 },
  { id: 's3', name: 'Chemistry', icon: 'flask-conical', color: '#22c55e', chapterCount: 10, progress: 38, xp: 95 },
  { id: 's4', name: 'Biology', icon: 'microscope', color: '#ec4899', chapterCount: 14, progress: 55, xp: 150 },
  { id: 's5', name: 'English', icon: 'book-open', color: '#3b82f6', chapterCount: 8, progress: 70, xp: 220 },
  { id: 's6', name: 'Urdu', icon: 'languages', color: '#8b5cf6', chapterCount: 6, progress: 50, xp: 110 },
  { id: 's7', name: 'Computer Science', icon: 'monitor', color: '#06b6d4', chapterCount: 10, progress: 42, xp: 105 }
]

export const physicsChapters: Chapter[] = [
  { id: 'c1', subjectId: 's1', name: 'Units and Measurements', number: 1, progress: 100, concepts: 5, formulae: 2, definitions: 8, questions: 15, isHighPriority: false },
  { id: 'c2', subjectId: 's1', name: 'Kinematics', number: 2, progress: 80, concepts: 6, formulae: 5, definitions: 10, questions: 20, isHighPriority: false },
  { id: 'c3', subjectId: 's1', name: 'Dynamics', number: 3, progress: 75, concepts: 8, formulae: 4, definitions: 12, questions: 25, isHighPriority: false },
  { id: 'c4', subjectId: 's1', name: 'Turning Effect of Forces', number: 4, progress: 64, concepts: 10, formulae: 6, definitions: 15, questions: 30, isHighPriority: true, pastPaperAppearances: 12 },
  { id: 'c5', subjectId: 's1', name: 'Gravitation', number: 5, progress: 20, concepts: 5, formulae: 3, definitions: 7, questions: 12, isHighPriority: false },
  { id: 'c6', subjectId: 's1', name: 'Work and Energy', number: 6, progress: 0, concepts: 7, formulae: 4, definitions: 9, questions: 18, isHighPriority: false },
  { id: 'c7', subjectId: 's1', name: 'Properties of Matter', number: 7, progress: 0, concepts: 9, formulae: 5, definitions: 14, questions: 22, isHighPriority: false },
  { id: 'c8', subjectId: 's1', name: 'Thermal Properties', number: 8, progress: 0, concepts: 6, formulae: 3, definitions: 10, questions: 16, isHighPriority: false }
]

export const momentumQuestions: Question[] = [
  {
    id: 'q1',
    chapterId: 'c4',
    topic: 'Linear Momentum',
    text: 'Define momentum and state its SI unit.',
    type: 'short',
    marks: 2,
    priority: 'high',
    pastPaperAppearances: 4,
    frequency: 4,
    answers: {
      exam: [
        { label: 'Definition', content: 'Momentum is defined as the product of mass and velocity of an object. It is a vector quantity.', marks: 1 },
        { label: 'SI Unit', content: 'The SI unit of momentum is kilogram meter per second (kg·m/s) or Newton second (N·s).', marks: 1 }
      ],
      easy: 'Momentum is just how hard it is to stop a moving object. You calculate it by multiplying the object\'s mass by its velocity. The unit is kg·m/s.',
      revision: [
        'Product of mass and velocity (p = mv)',
        'Vector quantity',
        'SI Unit: kg·m/s or N·s'
      ],
      commonMistake: 'Forgetting that momentum is a vector quantity and has a direction.'
    }
  },
  {
    id: 'q2',
    chapterId: 'c4',
    topic: 'Conservation of Momentum',
    text: 'State the law of conservation of momentum.',
    type: 'short',
    marks: 2,
    priority: 'high',
    pastPaperAppearances: 5,
    frequency: 5,
    answers: {
      exam: [
        { label: 'Statement', content: 'The total momentum of an isolated system of interacting bodies remains constant, provided no external force acts upon it.', marks: 2 }
      ],
      easy: 'If no outside forces push or pull on a group of objects, their total momentum stays exactly the same, even if they crash into each other.',
      revision: [
        'Total momentum of isolated system remains constant',
        'No external force must act on the system'
      ]
    }
  },
  {
    id: 'q3',
    chapterId: 'c4',
    topic: 'Linear Momentum',
    text: 'Derive the formula for momentum (p = mv) and relate it to Newton\'s Second Law.',
    type: 'derivation',
    marks: 5,
    priority: 'medium',
    pastPaperAppearances: 2,
    frequency: 2,
    answers: {
      exam: [
        { label: 'Newton\'s Second Law', content: 'F = ma', marks: 1 },
        { label: 'Acceleration', content: 'a = (vf - vi) / t', marks: 1 },
        { label: 'Substitution', content: 'F = m(vf - vi) / t => F = (mvf - mvi) / t', marks: 1 },
        { label: 'Momentum Definition', content: 'Since p = mv, F = (pf - pi) / t', marks: 1 },
        { label: 'Conclusion', content: 'Rate of change of momentum is equal to the applied force.', marks: 1 }
      ],
      easy: 'Force causes a change in speed. Since momentum is mass times speed, a force causes a change in momentum over time.',
      revision: [
        'Start with F = ma',
        'Substitute a = (vf - vi) / t',
        'F = (mvf - mvi) / t',
        'F = Δp / t'
      ]
    }
  },
  {
    id: 'q4',
    chapterId: 'c4',
    topic: 'Linear Momentum',
    text: 'A bullet of mass 20g is fired from a gun of mass 2kg with a velocity of 100 m/s. Find the recoil velocity of the gun.',
    type: 'numerical',
    marks: 5,
    priority: 'high',
    pastPaperAppearances: 3,
    frequency: 3,
    answers: {
      exam: [
        { label: 'Data', content: 'Mass of bullet (m) = 20g = 0.02kg, Mass of gun (M) = 2kg, Velocity of bullet (v) = 100 m/s', marks: 1 },
        { label: 'Formula', content: 'By law of conservation of momentum: Total initial momentum = Total final momentum (0 = Mv\' + mv)', marks: 1 },
        { label: 'Calculation', content: '0 = (2)(v\') + (0.02)(100) => 2v\' = -2', marks: 2 },
        { label: 'Result', content: 'v\' = -1 m/s (Negative sign indicates opposite direction)', marks: 1 }
      ],
      easy: 'Before firing, both gun and bullet are still (momentum = 0). After firing, their total momentum must still be 0. So, gun\'s backward momentum = bullet\'s forward momentum. Recoil velocity = -1 m/s.',
      revision: [
        'm = 0.02 kg, M = 2 kg, v = 100 m/s',
        'Initial momentum = Final momentum = 0',
        'Mv\' + mv = 0',
        'v\' = -1 m/s'
      ],
      commonMistake: 'Forgetting to convert the bullet mass from grams to kilograms.'
    }
  },
  {
    id: 'q5',
    chapterId: 'c4',
    topic: 'Newton\'s Laws',
    text: 'Explain Newton\'s second law of motion in terms of momentum.',
    type: 'long',
    marks: 5,
    priority: 'high',
    pastPaperAppearances: 6,
    frequency: 6,
    answers: {
      exam: [
        { label: 'Statement', content: 'The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force.', marks: 2 },
        { label: 'Derivation', content: 'F = ma = m(vf - vi)/t = (mvf - mvi)/t = (pf - pi)/t = Δp/t', marks: 2 },
        { label: 'Conclusion', content: 'Thus, applied force equals the rate of change of momentum.', marks: 1 }
      ],
      easy: 'Newton\'s second law basically says that if you push something (apply force), its momentum changes. The harder you push, the faster its momentum changes.',
      revision: [
        'Rate of change of momentum ∝ applied force',
        'F = Δp / t',
        'Takes place in direction of force'
      ]
    }
  },
  {
    id: 'q6',
    chapterId: 'c4',
    topic: 'Mass and Weight',
    text: 'Differentiate between mass and weight.',
    type: 'short',
    marks: 3,
    priority: 'medium',
    pastPaperAppearances: 2,
    frequency: 2,
    answers: {
      exam: [
        { label: 'Definition', content: 'Mass is the quantity of matter in a body. Weight is the force of gravity acting on a body.', marks: 1 },
        { label: 'Type & Unit', content: 'Mass is a scalar quantity (Unit: kg). Weight is a vector quantity (Unit: N).', marks: 1 },
        { label: 'Constancy', content: 'Mass remains constant everywhere. Weight changes with the value of g (gravity).', marks: 1 }
      ],
      easy: 'Mass is how much "stuff" you are made of (doesn\'t change). Weight is how hard gravity pulls on you (changes on the moon).',
      revision: [
        'Mass: quantity of matter, scalar, kg, constant',
        'Weight: force of gravity, vector, N (Newtons), varies with g'
      ]
    }
  },
  {
    id: 'q7',
    chapterId: 'c4',
    topic: 'Impulse',
    text: 'What is impulse? Give its mathematical formula.',
    type: 'definition',
    marks: 2,
    priority: 'medium',
    pastPaperAppearances: 3,
    frequency: 3,
    answers: {
      exam: [
        { label: 'Definition', content: 'Impulse is defined as the product of force and the time during which the force acts on a body. It equals the change in momentum.', marks: 1 },
        { label: 'Formula', content: 'I = F × t = Δp', marks: 1 }
      ],
      easy: 'Impulse is a huge force hitting something for a very short time, like a bat hitting a cricket ball. It changes the ball\'s momentum.',
      revision: [
        'Force acting for a short time',
        'I = F × t',
        'Equal to change in momentum (Δp)'
      ]
    }
  },
  {
    id: 'q8',
    chapterId: 'c4',
    topic: 'Collisions',
    text: 'Explain elastic and inelastic collisions with examples.',
    type: 'long',
    marks: 5,
    priority: 'low',
    pastPaperAppearances: 1,
    frequency: 2,
    answers: {
      exam: [
        { label: 'Elastic Collision', content: 'A collision in which both momentum and kinetic energy are conserved. Example: Collision between ideal gas molecules or billiard balls.', marks: 2 },
        { label: 'Inelastic Collision', content: 'A collision in which momentum is conserved but kinetic energy is not conserved (lost as heat/sound). Example: A car crash or dropping a ball of clay.', marks: 2 },
        { label: 'Key Difference', content: 'Kinetic energy conservation is the differentiating factor.', marks: 1 }
      ],
      easy: 'Elastic collision: Bouncy, no energy lost (billiard balls). Inelastic collision: Sticky or destructive, energy lost as heat or sound (car crash).',
      revision: [
        'Elastic: Momentum & KE conserved (billiard balls)',
        'Inelastic: Only momentum conserved, KE lost (car crash)',
        'Difference is KE conservation'
      ]
    }
  }
]

export const materials: Material[] = [
  { id: 'm1', title: 'Physics Chapter 4 Notes', type: 'pdf', status: 'teacher_verified', dateAdded: new Date('2025-01-15').toISOString(), size: '2.4 MB', authorId: 't1' },
  { id: 'm2', title: 'Mathematics Formulae Sheet', type: 'pdf', status: 'verified', dateAdded: new Date('2025-01-20').toISOString(), size: '1.1 MB', authorId: 'a1' },
  { id: 'm3', title: 'Physics Lecture Recording', type: 'lecture', status: 'student_uploaded', dateAdded: new Date('2025-02-01').toISOString(), size: '145 MB', authorId: 'u1' },
  { id: 'm4', title: 'Past Paper 2024', type: 'pastpaper', status: 'verified', dateAdded: new Date('2025-02-10').toISOString(), size: '3.2 MB', authorId: 'a1' },
  { id: 'm5', title: 'Chemistry Lab Notes', type: 'notes', status: 'pending', dateAdded: new Date('2025-02-25').toISOString(), size: '4.5 MB', authorId: 'u1' },
  { id: 'm6', title: 'English Letter Writing Guide', type: 'notes', status: 'teacher_verified', dateAdded: new Date('2025-03-01').toISOString(), size: '0.8 MB', authorId: 't1' }
]

export const topicFrequencies: TopicFrequency[] = [
  { topic: 'Linear Momentum', appearances: 4, priority: 'high', lastSeenYear: 2024 },
  { topic: 'Newton\'s Laws', appearances: 6, priority: 'high', lastSeenYear: 2025 },
  { topic: 'Impulse', appearances: 3, priority: 'medium', lastSeenYear: 2023 },
  { topic: 'Conservation of Momentum', appearances: 5, priority: 'high', lastSeenYear: 2024 },
  { topic: 'Collisions', appearances: 2, priority: 'low', lastSeenYear: 2022 }
]

export const pastPapers: PastPaper[] = [
  { id: 'pp1', title: 'Physics 2025', year: 2025, board: 'Federal Board', subjectId: 's1', type: 'annual' },
  { id: 'pp2', title: 'Physics 2024', year: 2024, board: 'Federal Board', subjectId: 's1', type: 'annual' },
  { id: 'pp3', title: 'Physics 2023', year: 2023, board: 'Federal Board', subjectId: 's1', type: 'annual' },
  { id: 'pp4', title: 'Physics 2022', year: 2022, board: 'Federal Board', subjectId: 's1', type: 'annual' },
  { id: 'pp5', title: 'Physics 2021', year: 2021, board: 'Federal Board', subjectId: 's1', type: 'annual' }
]

export const pastPaperQuestions: PastPaperQuestion[] = [
  { id: 'ppq1', paperId: 'pp1', questionId: 'q2', number: 1, part: 'a', marks: 2 },
  { id: 'ppq2', paperId: 'pp1', questionId: 'q5', number: 2, marks: 5 },
  { id: 'ppq3', paperId: 'pp2', questionId: 'q1', number: 1, part: 'b', marks: 2 },
  { id: 'ppq4', paperId: 'pp2', questionId: 'q4', number: 3, marks: 5 },
  { id: 'ppq5', paperId: 'pp3', questionId: 'q7', number: 1, part: 'c', marks: 2 },
  { id: 'ppq6', paperId: 'pp3', questionId: 'q3', number: 4, marks: 5 },
  { id: 'ppq7', paperId: 'pp4', questionId: 'q2', number: 1, part: 'a', marks: 2 },
  { id: 'ppq8', paperId: 'pp4', questionId: 'q6', number: 2, marks: 3 },
  { id: 'ppq9', paperId: 'pp5', questionId: 'q5', number: 5, part: 'a', marks: 5 },
  { id: 'ppq10', paperId: 'pp5', questionId: 'q8', number: 5, part: 'b', marks: 5 }
]

export const todaysMissions: StudyMission[] = [
  { id: 'sm1', title: 'Understand Turning Effects', subject: 'Physics', duration: 25, type: 'learn', completed: false, xpReward: 50 },
  { id: 'sm2', title: 'Practice Quadratic Equations', subject: 'Mathematics', duration: 35, type: 'practice', completed: true, xpReward: 70 },
  { id: 'sm3', title: 'Weak Areas Review', subject: 'Revision', duration: 20, type: 'revise', completed: false, xpReward: 40 }
]

export const groups: Group[] = [
  { id: 'g1', name: 'Class 10-A', memberCount: 32, teacherName: 'Mr. Asif Ahmed', description: 'Official group for section A', isPrivate: false },
  { id: 'g2', name: 'Class 10-B Study Group', memberCount: 8, teacherName: 'Ms. Fatima', description: 'Study group for upcoming exams', isPrivate: true }
]

export const sampleConversation: TutorMessage[] = [
  {
    id: 'msg1',
    role: 'user',
    content: 'Can you explain momentum to me?',
    timestamp: new Date('2025-03-10T10:00:00Z').toISOString()
  },
  {
    id: 'msg2',
    role: 'assistant',
    content: 'Absolutely! **Momentum** is a fundamental concept in Physics. Think of it as "mass in motion".\n\nAll objects have mass, so if an object is moving, it has momentum. It depends on two variables:\n1. **Mass (m)** - How heavy it is\n2. **Velocity (v)** - How fast it is moving',
    timestamp: new Date('2025-03-10T10:00:05Z').toISOString(),
    responseBlocks: [
      { type: 'formula', content: 'p = m \\times v', title: 'Momentum Formula' },
      { type: 'concept', content: 'Vector Quantity', description: 'It has both magnitude and direction (the same direction as velocity).' }
    ],
    sources: [
      { title: 'Physics Chapter 4 Textbook', type: 'book', id: 'src1' }
    ],
    suggestedActions: [
      { label: 'Show me an example', action: 'show_example' },
      { label: 'Simplify this', action: 'simplify' }
    ]
  },
  {
    id: 'msg3',
    role: 'user',
    content: 'Could you simplify this a bit?',
    timestamp: new Date('2025-03-10T10:01:00Z').toISOString()
  },
  {
    id: 'msg4',
    role: 'assistant',
    content: 'Sure! Imagine a table tennis ball and a bowling ball moving at the exactly same speed towards you.\n\nWhich one is harder to stop?\n\nThe bowling ball! Even though they have the same speed, the bowling ball has much more mass, so it has more **momentum**.\n\nMomentum is just a measure of how hard it is to stop something that is moving.',
    timestamp: new Date('2025-03-10T10:01:05Z').toISOString(),
    suggestedActions: [
      { label: 'Got it, let\'s practice!', action: 'practice' },
      { label: 'What about conservation of momentum?', action: 'ask_conservation' }
    ]
  }
]

export const achievements: Achievement[] = [
  { id: 'ach1', title: 'First Steps', description: 'Completed your first study session.', icon: 'footprints', earned: true, dateEarned: new Date('2025-01-01').toISOString(), xp: 100 },
  { id: 'ach2', title: 'First Question', description: 'Asked your first question to the AI tutor.', icon: 'message-circle', earned: true, dateEarned: new Date('2025-01-02').toISOString(), xp: 50 },
  { id: 'ach3', title: 'Study Streak', description: 'Study for 7 consecutive days.', icon: 'flame', earned: false, xp: 200, progress: 3, maxProgress: 7 },
  { id: 'ach4', title: 'Revision Master', description: 'Complete 10 revision sessions.', icon: 'repeat', earned: false, xp: 150, progress: 4, maxProgress: 10 },
  { id: 'ach5', title: 'Practice Champion', description: 'Score 100% in 5 practice quizzes.', icon: 'trophy', earned: false, xp: 300, progress: 1, maxProgress: 5 },
  { id: 'ach6', title: 'Flowchart Explorer', description: 'Interact with 5 concept flowcharts.', icon: 'git-merge', earned: false, xp: 100, progress: 2, maxProgress: 5 }
]

export const onboardingSteps: OnboardingStep[] = [
  { id: 'ob1', title: 'Welcome', description: 'Welcome to the AI Tutor platform', completed: true },
  { id: 'ob2', title: 'Profile Setup', description: 'Set up your student profile', completed: true },
  { id: 'ob3', title: 'Subject Selection', description: 'Choose your subjects', completed: true },
  { id: 'ob4', title: 'Learning Style', description: 'Determine your learning style', completed: false },
  { id: 'ob5', title: 'Goal Setting', description: 'Set your academic goals', completed: false },
  { id: 'ob6', title: 'Schedule', description: 'Plan your study schedule', completed: false },
  { id: 'ob7', title: 'AI Introduction', description: 'Learn how to use the AI Tutor', completed: false },
  { id: 'ob8', title: 'First Mission', description: 'Complete your first study mission', completed: false },
  { id: 'ob9', title: 'Community', description: 'Join study groups', completed: false },
  { id: 'ob10', title: 'Parents Portal', description: 'Invite parents', completed: false },
  { id: 'ob11', title: 'Ready', description: 'Start learning!', completed: false }
]

export const momentumFlowchartNodes: FlowchartNode[] = [
  { id: 'fn1', label: 'Momentum (p)', type: 'concept', position: { x: 250, y: 50 }, content: 'Product of mass and velocity' },
  { id: 'fn2', label: 'Mass (m)', type: 'variable', position: { x: 100, y: 150 }, content: 'Scalar, unit: kg' },
  { id: 'fn3', label: 'Velocity (v)', type: 'variable', position: { x: 400, y: 150 }, content: 'Vector, unit: m/s' },
  { id: 'fn4', label: 'Formula: p = mv', type: 'formula', position: { x: 250, y: 250 }, content: 'Vector quantity' },
  { id: 'fn5', label: 'SI Unit: kg·m/s', type: 'detail', position: { x: 250, y: 350 }, content: 'Also N·s' },
  { id: 'fn6', label: 'Conservation', type: 'concept', position: { x: 100, y: 450 }, content: 'Total momentum remains constant' },
  { id: 'fn7', label: 'Applications', type: 'concept', position: { x: 400, y: 450 }, content: 'Rockets, collisions, explosions' }
]

export const momentumFlowchartEdges: FlowchartEdge[] = [
  { id: 'fe1', source: 'fn1', target: 'fn2', label: 'Depends on' },
  { id: 'fe2', source: 'fn1', target: 'fn3', label: 'Depends on' },
  { id: 'fe3', source: 'fn2', target: 'fn4' },
  { id: 'fe4', source: 'fn3', target: 'fn4' },
  { id: 'fe5', source: 'fn4', target: 'fn5' },
  { id: 'fe6', source: 'fn1', target: 'fn6', label: 'Law' },
  { id: 'fe7', source: 'fn1', target: 'fn7', label: 'Used in' }
]

export const englishFormats: WritingFormat[] = [
  { id: 'ef1', name: 'Letter', description: 'Informal or formal letter structure', language: 'english', sections: [
    { name: 'Format', description: 'Sender address, date, receiver address', required: true },
    { name: 'Opening', description: 'Salutation (Dear..., Respected...)', required: true },
    { name: 'Body', description: 'Main message, usually 2-3 paragraphs', required: true },
    { name: 'Closing', description: 'Sign-off (Yours sincerely...) and signature', required: true }
  ]},
  { id: 'ef2', name: 'Application', description: 'Formal application structure', language: 'english', sections: [
    { name: 'Format', description: 'To the Principal/Manager...', required: true },
    { name: 'Subject', description: 'Brief statement of purpose', required: true },
    { name: 'Request', description: 'Detailed request or reason', required: true },
    { name: 'Closing', description: 'Yours obediently, Name, Date', required: true }
  ]},
  { id: 'ef3', name: 'Story', description: 'Narrative story structure', language: 'english', sections: [
    { name: 'Opening', description: 'Setting the scene and introducing characters', required: true },
    { name: 'Development', description: 'Building the plot and conflict', required: true },
    { name: 'Climax', description: 'The peak of the action/conflict', required: true },
    { name: 'Ending', description: 'Resolution of the story', required: true },
    { name: 'Moral', description: 'The lesson learned', required: false }
  ]}
]

export const urduFormats: WritingFormat[] = [
  { id: 'uf1', name: 'Tashreeh (تشریح)', description: 'Explanation of poetry or prose', language: 'urdu', sections: [
    { name: 'حوالہ متن', description: 'Reference to poet/author and book', required: true },
    { name: 'حل لغت', description: 'Meanings of difficult words', required: false },
    { name: 'تشریح', description: 'Detailed explanation', required: true }
  ]},
  { id: 'uf2', name: 'Khulasa (خلاصہ)', description: 'Summary of a chapter/story', language: 'urdu', sections: [
    { name: 'مصنف کا نام', description: 'Author name', required: true },
    { name: 'سبق کا عنوان', description: 'Title of the lesson', required: true },
    { name: 'مرکزی خیال', description: 'Central theme (optional)', required: false },
    { name: 'خلاصہ', description: 'Main summary (1/3rd length)', required: true }
  ]}
]

export const notifications: Notification[] = [
  { id: 'n1', userId: 'u1', title: 'Mission Completed!', message: 'You earned 70 XP for completing Math practice.', type: 'achievement', read: false, createdAt: new Date('2025-03-10T12:00:00Z').toISOString() },
  { id: 'n2', userId: 'u1', title: 'New Material Uploaded', message: 'Mr. Asif added new Physics notes.', type: 'system', read: true, createdAt: new Date('2025-03-09T08:30:00Z').toISOString() },
  { id: 'n3', userId: 'u1', title: 'Study Reminder', message: 'You have a pending Physics mission.', type: 'reminder', read: false, createdAt: new Date('2025-03-10T14:00:00Z').toISOString() },
  { id: 'n4', userId: 'u1', title: 'Level Up!', message: 'Congratulations! You reached Level 5.', type: 'achievement', read: true, createdAt: new Date('2025-03-05T10:15:00Z').toISOString() }
]
