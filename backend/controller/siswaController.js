import {PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()

export const getSiswa=async(req,res)=>{
    try {
        const response=await prisma.datasiswa.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export const getSiswaById=async(req,res)=>{try {
        const response=await prisma.datasiswa.findUnique({
        where:{
            id:Number(req.params.id)
        }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }}


export const createSiswa=async(req,res)=>{
    const {nama, alamat, tanggal_lahir, jurusan}=req.body
     try {
        const response=await prisma.datasiswa.create({
            data:{
                nama:nama,
                alamat:alamat,
                tanggal_lahir:new Date(tanggal_lahir),
                jurusan:jurusan
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export const updateSiswa=async(req,res)=>{
    const {nama, alamat, tanggal_lahir, jurusan}=req.body
     try {
        const response=await prisma.datasiswa.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                nama:nama,
                alamat:alamat,
                tanggal_lahir:new Date(tanggal_lahir),
                jurusan:jurusan
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }}


export const deleteSiswa = async (req, res) => {
  try {
    const response = await prisma.datasiswa.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(response)
  } catch (error) {
    console.error("❌ Gagal menghapus data:", error)
    res.status(500).json({ message: error.message })
  }
}



