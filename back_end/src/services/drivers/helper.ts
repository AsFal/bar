import { Document, Model } from "mongoose";
import { IContainer } from "../../interfaces/IContainer";
import { IContainerDatabase } from "../../interfaces/IContainerDatabase";

export async function removeDocumentFromContainer<T extends IContainer>
(containerDb: IContainerDatabase<T>, containerId: string, documentRef: string, documentId: string)
: Promise<T> {

    const container: T = await containerDb.fetch(containerId);
    const filteredDocuments = container[documentRef].filter((document: Document) => documentId.toString()
    != document._id.toString());
    if (filteredDocuments.length == container[documentRef].length) {
        throw new Error("The request document to be deleted is not part of the container.");
    }
    /**
     * @todo need some kind of type check that verifies that given documentRef is part of the T object
     */
// I need to make a generic container type for this
    return containerDb.update(containerId,
        {
            [documentRef]: filteredDocuments 
        }
    )
}

export async function addDocumentToContainer<T extends Document>(containerModel: Model<T>,
    containerId: string, arrayRef: string, documentId: string): Promise<T> {
        const container = await containerModel.findById(containerId).exec();
        const oldDocuments = container[arrayRef].slice();
        const newDocuments = oldDocuments.concat([documentId]);
        return containerModel.findByIdAndUpdate(containerId, {
            [arrayRef]: newDocuments
        }, {new: true}).exec();
}
