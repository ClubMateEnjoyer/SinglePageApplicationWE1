export class AbstractPOM {

    public static async showPage(path: string): Promise<void> {

        const pageContent = document.getElementById("PageContent");

        try {
            const response = await fetch(path, );
            if(!response.ok) {
                throw new Error(`Error, Status: ${response.status}`);
            }

            const container = await response.text();

            if(pageContent) {
                pageContent.innerHTML = '';
                pageContent.innerHTML = container;
            }else {
                console.error("Having trouble finding 'PageContent'.")
            }
        }catch(error) {
            console.error("Having trouble showing " + path + " Error: " + error);
        }
    }
}