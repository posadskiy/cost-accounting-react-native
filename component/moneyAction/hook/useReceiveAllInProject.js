import {loadAllUsersInProject} from "../../../actions/moneyActionsActions";
import {mapCleanProjectUsers} from "../../../mapper/UserMapper";

const useReceiveAllInProject = (userId) => {
  const [projectUsers, setProjectUsers] = useState();

  useEffect(() => {
    const receiveAllInProject = async () => {
      const allUsersInProject = await loadAllUsersInProject(userId);

      setProjectUsers(
        mapCleanProjectUsers(allUsersInProject)
      );
    };

    receiveAllInProject();
  }, [projectUsers.length]);
  
  return projectUsers;
}

export default useReceiveAllInProject;
