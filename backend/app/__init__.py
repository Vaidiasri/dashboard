from fastapi import FastAPI
import uvicorn
app=FastAPI( title="Self Visulization ",
    description="FastAPI Self Visulizatio application with MVC structure",
    version="1.0.0",)
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9000)
