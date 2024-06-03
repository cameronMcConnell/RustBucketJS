class RustBucket {
    
    // Input => url: string
    constructor(url) {
        if (typeof url !== "string") {
            throw new Error("Input url is not of type string");
        }

        this.url = url
    }

    // Input => file: File
    // Return => string
    async uploadFile(file) {
        const formData = new FormData();
        
        formData.append("file", file);

        const response = await fetch(this.url + "/bucket/upload_file", {
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
        const response = await fetch(this.url + "/bucket/download_file/" + fileName);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const blob = await response.blob();

        return blob;
    }

    // Input => void
    // Return => object[string]
    async getFileNames() {
        const response = await fetch(this.url + "/bucket/get_file_names");

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const fileNameStr = await response.text();

        return JSON.parse(fileNameStr);
    }

    // Input => fileNames: object[string]
    // Return => string
    async deleteFiles(fileNames) {
        let urlList;

        urlList = this.#formatFileNames(fileNames); 

        const response = await fetch(this.url + "/bucket/deleteFiles?file_names=" + urlList, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.statusText;
    }

    #formatFileNames(fileNames) {
        if (fileNames.constructor !== Array) {
            throw new Error("Not an Array");
        }

        let urlList = "";

        for (let i = 0; i < fileNames.length - 1; i++) {
            urlList += fileNames[i] + ",";
        }
        
        if (fileNames.length > 1) {
            urlList += fileNames[fileNames.length - 1];
        }

        return urlList;
    }
}

module.exports = RustBucket;