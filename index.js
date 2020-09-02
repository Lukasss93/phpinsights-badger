const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

(async () => {

    try {
        //get payload
        const payload = github.context.payload;

        //get json file path
        let path = core.getInput("path");

        //read json file
        const phpinsights = require(path);

        //service credentials
        const url = core.getInput('url');
        const password = core.getInput('password');

        //get repo user/name
        const author = payload.repository.owner
        const repo = payload.repository.name;

        //upload data
        await axios.post(url, {
            password: password,
            author: author,
            repo: repo,
            file: phpinsights
        });

    } catch (error) {
        console.log(JSON.stringify(error, undefined, 2));
        core.setFailed(error.message);
    }

})();