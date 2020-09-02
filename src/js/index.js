import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';


const state = {}

const controlSearch = async () => {
    // Get query
    const query = searchView.getInput();

    if (query) {
        // New search obj added to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        // Search for recipes
        await state.search.getResults();

        // Render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
