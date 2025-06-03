import { fetchXianxiaTerms } from './actions';
import DictionaryClient from './DictionaryClient';

export const metadata = {
  title: 'Dictionary | Xianxia',
  description: 'Learn the meaning of complex terms in Xianxia novels',
};

export default async function DictionaryPage() {
  const terms = await fetchXianxiaTerms();

  return (
    <div className="container mx-auto  p-6">
      <DictionaryClient terms={terms} />
    </div>
  );
}