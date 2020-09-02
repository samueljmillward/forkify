import Search from './models/Search';

const state = {}

const controlSearch = async () => {
    // Get query
    const query = 'pizza';

    if (query) {
        // New search obj added to state
        state.search = new Search(query);

        // Prepare UI for results

        // Search for recipes
        await state.search.getResults();

        // Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
