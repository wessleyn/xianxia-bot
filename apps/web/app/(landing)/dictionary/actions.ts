'use server';

export type Term = {
    id: number;
    name: string;
    chinese?: string;
    description: string;
    examples?: string;
    related?: string[];
};

// Sample Xianxia terms
const terms: Term[] = [
    {
        id: 1,
        name: 'Face',
        chinese: '面子 (Miànzi)',
        description: 'A concept representing one\'s social status, honor, and reputation. "Losing face" means being humiliated or disrespected, while "gaining face" means increasing one\'s reputation. In Xianxia novels, face is extremely important in social interactions and can even lead to life-or-death conflicts.',
        examples: '"How dare you speak to me this way in front of my disciples! You\'ve made me lose face!"',
        related: ['Reputation', 'Honor', 'Status', 'Prestige']
    },
    {
        id: 2,
        name: 'Dao',
        chinese: '道 (Dào)',
        description: 'The fundamental principle or "way" that underlies existence. In cultivation novels, cultivators seek to understand the Dao of different elements or concepts to advance their cultivation. The Dao can represent both a philosophical concept and a tangible power.',
        examples: '"His understanding of the Fire Dao had reached an unprecedented level, allowing him to control even the flames of the sun."',
        related: ['Cultivation', 'Enlightenment', 'Laws', 'Path']
    },
    {
        id: 3,
        name: 'Qi',
        chinese: '气 (Qì)',
        description: 'The life energy or vital force that flows through living beings and the world. Cultivators absorb and refine Qi to strengthen their bodies, extend their lifespans, and perform supernatural feats. Different regions or items may contain different qualities of Qi.',
        examples: '"He sat in meditation, drawing the rich spiritual Qi from the ancient spring into his dantian."',
        related: ['Spiritual Energy', 'Cultivation', 'Dantian', 'Meridians']
    },
    {
        id: 4,
        name: 'Young Master',
        chinese: '少爷 (Shàoye)',
        description: 'A common character archetype representing the arrogant son of a powerful family or sect. Young masters typically have wealthy backgrounds, significant resources, and a sense of entitlement. They often antagonize the protagonist and end up humiliated or defeated.',
        examples: '"Do you know who I am? I am the young master of the Azure Cloud Sect! How dare a mere mortal like you bump into me!"',
        related: ['Young Mistress', 'Arrogant', 'Rich', 'Antagonist']
    },
    {
        id: 5,
        name: 'Dantian',
        chinese: '丹田 (Dāntián)',
        description: 'An energy center in the body where cultivators store and refine their Qi. Most commonly located in the lower abdomen, the dantian is crucial for cultivation and serves as the foundation for advancing to higher realms.',
        examples: '"He could feel his dantian expanding as he broke through to the Foundation Establishment realm."',
        related: ['Qi', 'Core', 'Cultivation', 'Meridians', 'Breakthrough']
    }
];

export async function fetchXianxiaTerms(): Promise<Term[]> {
    // In a real app, this would fetch from a database
    // For now, we're returning the mock data
    return terms;
}