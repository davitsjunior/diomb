export const loadPosts = async () => {
    const filesResponse = fetch('http://localhost:10130/allfiles/list');
    const [files] = await Promise.all([filesResponse]);
    const filesJson = await files.json();
    return filesJson;
}

