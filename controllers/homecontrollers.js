const createproject = require('../models/createproject');
const bugs = require('../models/bugs');

//home page
module.exports.home = function(req,res){
    createproject.find({},function(err,projects){
        if(err){
            console.log('error in finding projects',err);
            return;
        }
        res.render('home',{
            project:projects
        });
    })
    
}

//create project page
module.exports.create = function(req,res){
    res.render('create-project');
}

//creating project and redirecting to home page if successful
module.exports.createproject = function(req,res){
    createproject.create({
        name:req.body.name,
        description:req.body.description,
        author:req.body.author
    },function(err,project){
        if(err){
            console.log('error in creating project',err);
            res.redirect('/create');
            return;
        }
        res.redirect('/');
    })
    
}

//project page which shows all the bugs
module.exports.projectpage = function(req,res){
    
    createproject.find({_id:req.query.id}).populate('bugs')
    .exec(function(err,project){
        if(err){
            console.log('error in finding projet in project page',err);
        }
        
        res.render('project-page',{
            projects:project[0],
            j:0
        })
    })
}

//issue page
module.exports.issuepage = function(req,res){
    res.render('issue-page',{
        id:req.query.id
    })
}

//create an issue and redirecting to projectpage if successful
module.exports.createissue = function(req,res){
    
    bugs.create({
        title:req.body.title,
        description:req.body.description,
        labels:req.body.label,
        author:req.body.author,
        project:req.body.projectid
    },function(err,bug){
        if(err){
            console.log('error in creating bug',err);
            res.redirect('/issue-page?id='+req.body.projectid);
            return;
        }
        createproject.find({_id:req.body.projectid},function(err,project){
            
            project[0].bugs.push(bug);
            project[0].save();
        })
        res.redirect('/project-page?id='+req.body.projectid);
    })
}

//filters

//label filter
module.exports.labelfilter = async function(req,res){
    try{
    let arr = [];
    if(req.body.red){
        let red = await bugs.find({labels:req.body.red});
        //console.log('red',red);
        for(let obj of red){
            if(obj.project == req.body.projectid){
            arr.push(obj);
            }
        }
    }
    if(req.body.green){
        let green = await bugs.find({labels:req.body.green});
        for(let obj of green){
            if(obj.project == req.body.projectid){
            arr.push(obj);
            }
        }
    }
    if(req.body.blue){
        let blue = await bugs.find({labels:req.body.blue});
        for(let obj of blue){
            if(obj.project == req.body.projectid){
            arr.push(obj);
            }
        }
    }
    
    createproject.find({_id:req.body.projectid}).populate('bugs')
    .exec(function(err,project){
        if(err){
            console.log('error in finding in filter',err);
            return;
        }
        res.render('project-page',{
            projects:project[0],
            j:1,
            bugs:arr
        })
    })
       
    }
    catch(err){
        console.log(err);
    }
   
}


//author filter
module.exports.authorfilter = function(req,res){
    let arr = [];

    createproject.find({_id:req.body.projectid}).populate('bugs')
    .exec(function(err,project){
        if(err){
            console.log('error in finding in filter',err);
            return;
        }
        var arr = [];
        var b = project[0].bugs;
        for(var i=0; i<b.length; i++){
            for(const item in req.body){
                if(item == b[i].author){
                    arr.push(b[i]);
                }
            }
        }

       res.render('project-page',{
            projects:project[0],
            j:1,
            bugs:arr
        })
    })
}

//search title and description filter
module.exports.search = function(req,res){
    var arr = [];
    bugs.find({$and: [{ title: req.body.title }, { description: req.body.description }]},
        function(err,bug){
            if(err){
                console.log('error in finding search',err);
                return;
            }
            
            for(var i=0; i<bug.length; i++){
                if(req.body.projectid == bug[i].project){
                    arr.push(bug[i]);
                }
            }
        });

    createproject.find({_id:req.body.projectid}).populate('bugs')
    .exec(function(err,project){
        if(err){
            console.log('error in finding in filter',err);
            return;
        }
        res.render('project-page',{
            projects:project[0],
            j:1,
            bugs:arr
        })
    })
    
}
