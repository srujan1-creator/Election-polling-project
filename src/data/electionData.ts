export interface ElectionStep {
  id: number;
  title: string;
  description: string;
  details: string[];
  position: [number, number, number]; // 3D Camera Focus Position
}

export const ELECTION_STEPS: ElectionStep[] = [
  {
    id: 1,
    title: 'Registration',
    description: 'The foundation of democracy starts here. Ensure you are eligible and registered to vote.',
    details: [
      'Check voter eligibility requirements (age, citizenship).',
      'Register online or at designated local offices.',
      'Verify your current address and voting district.',
      'Receive your voter ID card.'
    ],
    position: [0, 0, 5],
  },
  {
    id: 2,
    title: 'Campaigns & Rallies',
    description: 'Candidates present their platforms, debate policies, and connect with the public.',
    details: [
      'Candidates announce their intention to run.',
      'Primary elections may be held to select party nominees.',
      'Candidates host rallies, debates, and town halls.',
      'Voters research platforms and make informed decisions.'
    ],
    position: [5, 2, 0],
  },
  {
    id: 3,
    title: 'Voting Day',
    description: 'The moment your voice is heard. Cast your ballot anonymously and securely.',
    details: [
      'Find your designated polling station.',
      'Present required identification if necessary.',
      'Proceed to a voting booth to cast your vote.',
      'Submit your ballot via machines or ballot boxes.'
    ],
    position: [0, 0, 0], // Center piece (The VOTE button)
  },
  {
    id: 4,
    title: 'Results & Counting',
    description: 'Ballots are securely counted and verified to ensure election integrity.',
    details: [
      'Polls close and counting begins immediately.',
      'Election officials oversee the secure tallying of votes.',
      'Provisional and mail-in ballots are verified and counted.',
      'Final results are officially certified and announced.'
    ],
    position: [-5, 2, 0],
  },
  {
    id: 5,
    title: 'Interactive Polling Demo',
    description: 'Experience a simulation of an electronic voting machine. Select a candidate and cast your ballot securely.',
    details: [],
    position: [0, 0, 0],
  }
];
