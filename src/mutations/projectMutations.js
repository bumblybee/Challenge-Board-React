import { editProject } from "../api/projectsApi";

export const submitEditedProject = async (id, data) => {
    return await editProject(id, data);
};