export class ApiFeatures{

            //    model         req.query
    constructor(mongooseQuery,searchQuery){
        this.mongooseQuery = mongooseQuery;
        this.searchQuery= searchQuery
    }

    pagination(){
        if( this.searchQuery.page <= 0)  this.searchQuery.page =1
        let pageNumber= this.searchQuery.page * 1 || 1
        let pageLimit= 40
        let skib = (pageNumber - 1) * pageLimit
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skib).limit(pageLimit)
        return  this
    }

    filter(){

        let filerObj= {...this.searchQuery}

        let executedFieldes = ['page','sort','fields','fields']
    
        executedFieldes.forEach((val)=>{
            delete filerObj[ val]
        })
    
        filerObj = JSON.stringify(filerObj)
        filerObj=filerObj.replace(/(gt|gte|lt|lte)/g,(match)=> '$' + match
        )
        filerObj=JSON.parse(filerObj)

        this.mongooseQuery.find(filerObj)
        
        return this

    }


    sort(){
        if(this.searchQuery.sort){
            let  sortBy = this.searchQuery.sort.split(',').join( ' ')
            console.log(sortBy);
            this.mongooseQuery.sort(sortBy)
        }
        return this;
    }


    feildes(){
        if(this.searchQuery.fields){
            let  fields = this.searchQuery.fields.split(',').join( ' ')
            console.log(fields);
            this.mongooseQuery.select(fields)
        }
        return  this;
    }


    search(){

        if(this.searchQuery.keyword){
    
            this.mongooseQuery.find({$or:[
                {name:{$regex:this.searchQuery.keyword}},
                {title:{$regex:this.searchQuery.keyword}},
                {description:{$regex:this.searchQuery.keyword}}
            ]})
        }
        return this
    }


}