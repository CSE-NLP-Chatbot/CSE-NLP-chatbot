import os
from dotenv import load_dotenv
from langchain.document_loaders import UnstructuredURLLoader
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
import pickle
import faiss
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.chains.question_answering import load_qa_chain
from langchain import OpenAI

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')

loader = TextLoader(r"D:\Code Playground\SEP\chatbot\server\chatbot\UG.txt")
data = loader.load()
text_splitter = CharacterTextSplitter(separator='\n',
                                      chunk_size=1000,
                                      chunk_overlap=200)


docs = text_splitter.split_documents(data)

embeddings = OpenAIEmbeddings()

print(embeddings)

print("Recieved Embeddings")
vectorStore_openAI = FAISS.from_documents(docs, embeddings)

with open("faiss_store_openai.pkl", "wb") as f:
    pickle.dump(vectorStore_openAI, f)
    
with open("faiss_store_openai.pkl", "rb") as f:
    VectorStore = pickle.load(f)
   
retriever = VectorStore.as_retriever(search_type="similarity_score_threshold", search_kwargs={"score_threshold": .3})
llm=OpenAI(temperature=0, )
chain = RetrievalQAWithSourcesChain.from_llm(llm=llm, retriever=retriever)