import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

import UserList from "../components/UserList";

const User = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUser, setLoadedUser] = useState();

    useEffect(() => {
        const sentRequest = async () => {
                try {
                setIsLoading(true);
                const response = await fetch(
                  `${process.env.REACT_APP_BACKEND_URL}/users/`
                );
                const responseData = await response.json();
                console.log(responseData);

                if (!response.ok) {
                  throw new Error(responseData.message);
                }

                setLoadedUser(responseData.users);
              } catch (err) {
                setError(err.message);
              }
              setIsLoading(false);
            };
            sentRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}
        {!isLoading && loadedUser && <UserList items={loadedUser} />}
      </React.Fragment>
    );
}
 
export default User;
