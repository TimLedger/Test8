// import Quote from "../../components/Quote/Quote";
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import QuoteList from '../../components/QuoteList/QuoteList';
import './Home.css';

const Home = () => {
  return (
    <div className='home-page'>
      <CategoryMenu />
      {/* <Quote /> */}
      <QuoteList />
    </div>
  );
};

export default Home;