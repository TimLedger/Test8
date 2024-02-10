import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import QuoteList from '../../components/QuoteList/QuoteList';
import './Home.css';

const Home = () => {
  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected category id:", categoryId);
  };

  return (
    <div className='home-page'>
      <CategoryMenu onCategorySelect={handleCategorySelect} />
      <QuoteList />
    </div>
  );
};

export default Home;
