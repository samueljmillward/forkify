import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

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
        renderLoader(elements.searchRes);
        try {
            // Search for recipes
            await state.search.getResults();

            // Render results on UI
            clearLoader();

            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search...')

            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {
    // Get id from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //Prepare UI for changes

        //Create new recipe obj
        state.recipe = new Recipe(id);

        try {
            //Get recipe data
            await state.recipe.getRecipe();

            //Calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe')
        }
    }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe)); 
