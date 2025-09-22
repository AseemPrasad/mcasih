export interface Comment {
  id: string;
  intent: string;
  theme: string;
  stakeholder: string;
  summary: string;
  keywords: string[];
  strengthScore: number;
}

export interface FeedbackData {
  intentDistribution: Record<string, number>;
  thematicClusters: Record<string, Record<string, number>>;
  stakeholderDistribution: Record<string, number>;
  comments: Comment[];
}

export const mockData: FeedbackData = {
  intentDistribution: {
    'supportive': 2000,
    'objective': 1000,
    'request for clarification': 2000,
    'suggestion for modification': 500,
    'legal concern': 1000,
  },

  thematicClusters: {
    'supportive': {
      'compliance cost': 500,
      'transparency': 450,
      'investor protection': 400,
      'administrative burden': 350,
      'market efficiency': 300,
    },
    'objective': {
      'transparency': 300,
      'compliance cost': 250,
      'administrative burden': 200,
      'investor protection': 150,
      'market efficiency': 100,
    },
    'request for clarification': {
      'compliance cost': 600,
      'administrative burden': 500,
      'transparency': 400,
      'investor protection': 300,
      'market efficiency': 200,
    },
    'suggestion for modification': {
      'administrative burden': 150,
      'compliance cost': 125,
      'transparency': 100,
      'investor protection': 75,
      'market efficiency': 50,
    },
    'legal concern': {
      'compliance cost': 300,
      'investor protection': 250,
      'transparency': 200,
      'administrative burden': 150,
      'market efficiency': 100,
    },
  },

  stakeholderDistribution: {
    'stock exchange': 4200,
    'profitable organization': 1260,
    'ngo': 315,
    'individual investor': 630,
    'regulatory body': 210,
    'consulting firm': 315,
  },

  comments: [
    {
      id: 'comment_001',
      intent: 'supportive',
      theme: 'compliance cost',
      stakeholder: 'stock exchange',
      summary: 'The proposed amendment provides a clear framework for compliance that will reduce operational costs by standardizing processes across exchanges. The phased implementation approach allows for smooth transition while maintaining market integrity.',
      keywords: ['compliance framework', 'operational costs', 'standardization', 'phased implementation', 'market integrity'],
      strengthScore: 9.2,
    },
    {
      id: 'comment_002',
      intent: 'objective',
      theme: 'transparency',
      stakeholder: 'profitable organization',
      summary: 'While the transparency requirements are comprehensive, the timeline for implementation may need adjustment to allow adequate system upgrades. The disclosure formats should align with international standards.',
      keywords: ['transparency requirements', 'implementation timeline', 'system upgrades', 'disclosure formats', 'international standards'],
      strengthScore: 7.8,
    },
    {
      id: 'comment_003',
      intent: 'legal concern',
      theme: 'investor protection',
      stakeholder: 'regulatory body',
      summary: 'The amendment may conflict with existing securities regulations regarding investor protection measures. Specific provisions need clarification to avoid regulatory overlap and ensure consistent enforcement.',
      keywords: ['securities regulations', 'investor protection', 'regulatory overlap', 'enforcement consistency', 'legal conflicts'],
      strengthScore: 8.9,
    },
    {
      id: 'comment_004',
      intent: 'request for clarification',
      theme: 'administrative burden',
      stakeholder: 'consulting firm',
      summary: 'The definition of "material changes" requires further clarification as it impacts reporting obligations. Small and medium enterprises may face disproportionate administrative burden without clear guidelines.',
      keywords: ['material changes', 'reporting obligations', 'SME impact', 'administrative burden', 'clear guidelines'],
      strengthScore: 7.5,
    },
    {
      id: 'comment_005',
      intent: 'suggestion for modification',
      theme: 'compliance cost',
      stakeholder: 'individual investor',
      summary: 'Suggest implementing a tiered compliance structure based on company size to reduce costs for smaller entities while maintaining robust oversight for larger corporations.',
      keywords: ['tiered compliance', 'company size', 'cost reduction', 'smaller entities', 'corporate oversight'],
      strengthScore: 6.8,
    },
    {
      id: 'comment_006',
      intent: 'supportive',
      theme: 'transparency',
      stakeholder: 'ngo',
      summary: 'The enhanced transparency requirements will significantly improve market confidence and enable better monitoring of corporate activities. This aligns with global best practices in corporate governance.',
      keywords: ['transparency requirements', 'market confidence', 'corporate monitoring', 'global best practices', 'corporate governance'],
      strengthScore: 8.1,
    },
    {
      id: 'comment_007',
      intent: 'objective',
      theme: 'market efficiency',
      stakeholder: 'stock exchange',
      summary: 'The proposed changes may impact trading volumes initially but should improve market efficiency in the long term. Real-time monitoring systems will need substantial upgrades.',
      keywords: ['trading volumes', 'market efficiency', 'long-term impact', 'real-time monitoring', 'system upgrades'],
      strengthScore: 7.3,
    },
    {
      id: 'comment_008',
      intent: 'legal concern',
      theme: 'compliance cost',
      stakeholder: 'profitable organization',
      summary: 'The retrospective application of certain provisions may violate principles of natural justice and impose unfair financial burden on companies that complied with previous regulations.',
      keywords: ['retrospective application', 'natural justice', 'financial burden', 'previous regulations', 'unfair impact'],
      strengthScore: 9.0,
    },
    {
      id: 'comment_009',
      intent: 'request for clarification',
      theme: 'investor protection',
      stakeholder: 'individual investor',
      summary: 'How will the new investor protection measures affect existing investment products? Clarity needed on grandfathering provisions and transition arrangements.',
      keywords: ['investor protection measures', 'investment products', 'grandfathering provisions', 'transition arrangements', 'existing products'],
      strengthScore: 6.5,
    },
    {
      id: 'comment_010',
      intent: 'supportive',
      theme: 'administrative burden',
      stakeholder: 'regulatory body',
      summary: 'The streamlined reporting mechanism will reduce administrative burden while improving data quality and regulatory oversight capabilities. Electronic filing systems should be standardized.',
      keywords: ['streamlined reporting', 'administrative burden', 'data quality', 'regulatory oversight', 'electronic filing'],
      strengthScore: 8.4,
    }
  ],
};