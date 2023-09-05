export const loadPosts = async () => {
    try {
        const filesResponse = await fetch('http://localhost:10130/allfiles/list');
        if (!filesResponse.ok) {
            throw new Error('Erro ao carregar os posts.');
        }
        const filesJson = await filesResponse.json();
        return filesJson;
    } catch (error) {
        throw error; // Re-throw the error to handle it in the component
    }
}