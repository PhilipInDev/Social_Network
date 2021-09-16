import ReactDOM from 'react-dom';
import SocialNetworkApp from "./App";

it('App Component is rendering fine', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);
})