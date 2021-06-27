export const readURI = (e, setter, limit = 1) => {
    if (e?.target?.files) {

        /* Get files in array form */
        const files = Array.from(e.target.files);

        /* Map each file to a promise that resolves to an array of image URI's */ 
        Promise.all(files.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
        .then(images => {

            /* Once all promises are resolved, update state with image URI array */
            setter(images.slice(0, limit));
        }, error => {        
            console.error(error);
        });
    }
};
