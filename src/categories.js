/*
ライフ
*/

exports.mod = (mod_data) => {
    logger.logInfo("[MOD] LifeMeds");
    //testing 
    let ModFolderName = `${mod_data.author}-${mod_data.name}-${mod_data.version}`;
    let ModFolders = mod_data.categ;
    let ModFileNames = mod_data.things;
    let PathResolver = global.internal.path.resolve;

    // load cache files we need
    let locale_en = global.fileIO.readParsed(PathResolver('user/cache/locale_en.json'));
    let templates = global.fileIO.readParsed(PathResolver('user/cache/templates.json'));

    //we gonna store temporal data here;
    let tDataBase = {};

    // you can replace it with reading folder names and file names from directories should be easier to maintain then we will not need folders and filenames made by hand
    // to read all files/folders in specified directory use global.json.readDir(path)
    // a PathResolver should fix the wrong pathing problem :) aka file not found thing
    for(let folder of ModFolders)
    {
        tDataBase[folder] = {};
        for(let file of ModFileNames)
        {
            let fileData = global.fileIO.readParsed(PathResolver(`user/mods/${ModFolderName}/${folder}/${file}.json`));
            
            tDataBase[folder][file] = fileData;
        }
    }
    // process "files/locales/en"
    for(let item in tDataBase["test/handbook"])
    {
        let itemData = tDataBase["test/handbook"][item];
        locale_en.handbook[item] = itemData;
    }
        // process "files/templates"
    for(let item in tDataBase["test/templates"])
    {
        let itemData = tDataBase["test/templates"][item];
        templates.data.Categories.push(itemData);
    }
    
    fileIO.write(PathResolver('user/cache/locale_en.json'), locale_en, true);
    fileIO.write(PathResolver('user/cache/templates.json'), templates, true);
    logger.logSuccess("[MOD] LifeMeds; Applied");
}