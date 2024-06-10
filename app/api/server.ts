'use server'
import prisma from "@/lib/prisma"
import { revalidatePath} from "next/cache";


export type UserType = {
  id: string,
  name: string,
  image: string,
  email: string
}
export type Category = {
  id: string;
  geturl: string;
  img: string;
  videoname: string;
  name: string;
  free: string;
  minunts: string;
  describtion: string | null;
  src: string;
  meid: string
  completed: boolean
};

export  type AuthorData = {
  categoreyname: string;
  name: string;
  img: string;
  videonum: number;
  free: string;
  description: string | null,
  maxtime: string;
  completedvideos: number,
  geturl: string;
  categories: Category[];
};



export async function Authors(data: AuthorData) {
  try {
    const createdAuthor = await prisma.authersData.create({
      data: {
        categoreyname: data.categoreyname,
        name: data.name,
        img: data.img,
        completedvideos: data.completedvideos,
        videonum: data.videonum,
        description: data.description!,
        free: data.free,
        maxtime: data.maxtime,
        geturl: data.geturl,
        categories: {
          create: data.categories.map((category: Category) => ({
            meid: category.id,
            completed: category.completed,
            categoreyname: data.categoreyname,
            name: category.name,
            img: category.img,
            videoname: category.videoname,
            minunts: category.minunts,
            free: category.free,
            geturl: category.geturl,
            src: category.src,
            describtion: category.describtion
            
          }))
        }
      }
    });

    console.log('Created Author with Categories:', createdAuthor);
    return createdAuthor;
  } catch (err: any) {
    console.error('Error creating author with categories:', err.message);
    throw err;
  }
}

export async function GetAutherData(geturl: string[]){
  try {
    const data = await prisma.authersData.findMany({
      where:
      {
        geturl: { in: geturl }
      },
      include: {
        categories: true, 
        feedBacks: true
      },
    });
    
    return data;
  } catch (err: any) {
    console.log(err.message)
  }
}
export async function addDescriptiuon(id: string, description: string){
  try {
    const data = await prisma.authersData.update({
      where: {
        id,
      },
      data: {
        description: description,
      }
    });
    
    return data;
  } catch (err: any) {
    console.log(err.message)
  }
}


export async function GetAllCategories(search: string) {
  try {
    const data = await prisma.authersData.findMany({
      where: {
        categories: {
          some: {
            videoname: {
              contains: search,
              mode: 'insensitive' 
            }
          }
        }
      },
      include: {
        categories: true,
      }
    });
    
    return data;
  } catch (err: any) {
    console.log(err.message)
  }
}
export async function GetAllAutherData() {
  try {
    const data = await prisma.authersData.findMany({
      include: {
        categories: true, 
      },
    });
    
    return data;
  } catch (err: any) {
    console.log(err.message)
  }
}

export async function editCompleted(id: string, newMessage: boolean,  pathname: string) {
  try {
    const comments = await prisma.categories.update(
      {
        where: { id, },
        
        data: {
        completed: newMessage
        }
      });
    if(pathname === null) return 'err'
    revalidatePath(pathname)
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}
export async function increaseNumber(id: string, newMessage: number,  pathname: string) {
  try {
    const comments = await prisma.authersData.update(
      {
        where: { id, },
        
        data: {
        completedvideos: newMessage
        }
      });
    if(pathname === null) return 'err'
    revalidatePath(pathname)
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}




// Comments Part
export async function createComment({name, image, message,  categoryId, pathname, }: {name: string, image: string, message: string, categoryId: string, pathname: string}) {
  try {
    const comment = await prisma.comment.create({
      data: {
        name,
        image,
        message: message,
        createdAt: new Date().toISOString(),
        category: {
          connect: { id: categoryId }
        },
        
      }
    });

    if(pathname === null) return 'err'
    revalidatePath(pathname)
    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }

}

export async function getComments(categoryId: string) {
  try {
    const comments = await prisma.categories.findUnique(
      {
        where: { id: categoryId },
        include: {
          comments: true
        }
      });
    
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export const deleteComment = async (id: string, pathname: string) => {
  try {
    await prisma.comment.delete({
      where: { id },
    });
    revalidatePath(pathname)
  } catch (err) {
    console.log(err)
  }
}
export async function editComment(id: string, newMessage: string,  pathname: string) {
  try {
    const comments = await prisma.comment.update(
      {
        where: { id, },
        
        data: {
        message: newMessage
        }
      });
    if(pathname === null) return 'err'
    revalidatePath(pathname)
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

// Likes
export async function Likes(id: string, pathname: string) {
  try {
    const like = await prisma.like.create({
      data: {
        commentId: id,
      },
    })

    if (!pathname) return 'err'
    revalidatePath(pathname)
    return like
  } catch (err) {
    console.error(err)
    throw new Error('Error creating like')
  } finally {
    await prisma.$disconnect()
  }
}
export async function GetLikes(id: string, pathname: string) {
  try {
    const like = await prisma.comment.findUnique({
      where: { id, },
      include: {
        likes: true
      }
    })

    if (!pathname) return 
    revalidatePath(pathname)
    return like

  } catch (err) {
    console.error(err)
    throw new Error('Error creating like')
  } finally {
    await prisma.$disconnect()
  }
}


export const deleteLike = async (id: string, pathname: string): Promise<void | { id: string; categoryId: string | null; feedBackId: string | null; commentId: string | null; }> => {
  try {
    const item = await prisma.like.delete({
      where: { id },
    });
    if (pathname) {
      revalidatePath(pathname);
    }
    return item;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};



// Feedback
type Feedback = {
  id: string,
  body: string,
  image: string,
  name: string,
  categoryname: string,
  pathname: string
}
export type FeedbackType = {
  id: string,
  name: string,
  image: string,
  body: string,
  categoryname: string,
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
export async function createFeedback({name, image, id, body, categoryname, pathname}: Feedback) {
  try {
    const like = await prisma.feedBack.create({
      data: {
        name,
        image,
        body,
        categoryname,
        createdAt: new Date().toISOString(),
        author: {
          connect: { id, }
        },
      }
    })
    if (pathname) {
      revalidatePath(pathname);
    }
    return like
  } catch (err) {
    console.error(err)
    throw new Error('Error creating feedBack')
  } finally {
    await prisma.$disconnect()
  }
}
export async function getFeedbacks(pathname: string) {
  try {
    const like = await prisma.feedBack.findMany()
    if (pathname) {
      revalidatePath(pathname);
    }
    return like
  } catch (err) {
    console.error(err)
    throw new Error('Error finding feedBacks')
  } finally {
    await prisma.$disconnect()
  }
}

export async function editFeedback(id: string, newMessage: string,  pathname: string) {
  try {
    const comments = await prisma.feedBack.update(
      {
        where: { id, },
        
        data: {
        body: newMessage
        }
      });
    if(pathname === null) return 'err'
    revalidatePath(pathname)
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}
export const deleteFeedback = async (id: string, pathname: string) => {
  try {
    await prisma.feedBack.delete({
      where: { id },
    });
    revalidatePath(pathname)
  } catch (err) {
    console.log(err)
  }
}
export async function createFeedbackLikes(id: string, pathname: string) {
  try {
    const like = await prisma.like.create({
      data: {
        feedBackId: id,
      },
    })

    if (!pathname) return 'err'
    revalidatePath(pathname)
    return like
  } catch (err) {
    console.error(err)
    throw new Error('Error creating like')
  } finally {
    await prisma.$disconnect()
  }
}
export async function getFeedbackLikes(id: string, pathname: string) {
  try {
    const like = await prisma.feedBack.findUnique({
      where: { id, },
      include: {
        like: true
      }
    })

    if (!pathname) return 
    revalidatePath(pathname)
    return like

  } catch (err) {
    console.error(err)
    throw new Error('Error creating like')
  } finally {
    await prisma.$disconnect()
  }
}
