import { Document, Model } from "mongoose";


/**
 * @throws {Error} when the documentid is not part of the container
 * @param containerModel
 * @param containerId
 * @param documentRef
 * @param documentId
 */
export async function removeDocumentFromContainer<T extends Document>(containerModel: Model<T>, containerId: string, documentRef: string, documentId: string)
: Promise<T> {

    const container = await containerModel.findById(containerId).exec();
    const filteredDocuments = container[documentRef].filter((document: Document) => documentId.toString()
    != document._id.toString());
    if (filteredDocuments.length == container[documentRef].length) {
        console.log(filteredDocuments);
        console.log(container[documentRef]);
        console.log(documentId);
        throw new Error("The request document to be deleted is not part of the container.");
    }
    return containerModel.findByIdAndUpdate(container._id, {
        [documentRef]: filteredDocuments
    }, {new: true}).exec();
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
