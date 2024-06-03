class RustBucket {
    
    // Input => url: string
    constructor(url) {
        if (typeof(url) != "string") {
            throw new Error("Input url is not of type 'string'.\n");
        }

        this.url = url
    }

    // Input => file: File
    // Return => string
    async uploadFile(file) {
        const formData = new FormData();
        
        try { formData.append("file", file); }
        catch (err) { throw err; }

        const response = await fetch(url + "/bucket/upload_file", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.statusText;
    }

    // Input => fileName: string
    // Return => Blob
    async downloadFile(fileName) {
        if (typeof(fileName) != "string") {
            throw new Error("fileName is not of type 'string'.\n");
        }

        const response = await fetch(url + "/bucket/download_file/" + fileName);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const blob = await response.blob();

        return blob;
    }

    // Input => void
    // Return => object[string]
    async getFileNames() {
        const response = await fetch(url + "/bucket/get_file_names");

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const fileNameStr = await response.text();

        return JSON.parse(fileNameStr);
    }

    // Input => fileNames: object[string]
    // Return => string
    async deleteFiles(fileNames) {
        if (typeof(fileNames) != "object") {
            throw new Error("fileNames is not of type 'object'.\n");
        }

        let urlList;

        try { urlList = this.#formatFileNames(fileNames); } 
        catch (err) { throw err; }

        const response = await fetch(url + "/bucket/deleteFiles?file_names=" + urlList, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.statusText;
    }

    #formatFileNames(fileNames) {
        let urlList = "";

        for (let i = 0; i < fileNames.length - 1; i++) {
            if (typeof(fileNames[i]) != "string") {
                throw new Error("Element of fileNames is not of type 'string'.\n");
            }

            urlList += fileNames[i] + ",";
        }
        
        if (fileNames.length > 1) {
            urlList += fileNames[fileNames.length - 1];
        }

        return urlList;
    }
}

export default RustBucket;