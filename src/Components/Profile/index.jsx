import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, updateUser } from "../../Auth/auth";
import { setUser, addWordList } from "../../Store/Actions/appActions";
import { LoadSavedData } from "../../Database/Database";

export const Profile = () => {
  const user = useSelector(state => state.app.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkPassword = async () => {
    try {
      await loginUser(user.email, currentPassword);
      setError(null);
      return true;
    } catch {
      setError("Wrong Password!");
      return false;
    }
  };

  const reloadUserData = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      dispatch(setUser({ ...data.user, token: data.token }));
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const onChangeName = async () => {
    setLoading(true);
    const validPassword = await checkPassword();
    if (validPassword) {
      const result = await updateUser(user.token, user.id, { name: name });
      console.log(result);
      await reloadUserData(user.email, currentPassword);
    } else {
      console.log("wrong password!!");
    }
    setLoading(false);
  };
  const onChangePassword = async () => {
    if (newPassword !== newRepeatedPassword) {
      setError("Given passwords don't match!");
      return;
    }
    if (newPassword.length < 5) {
      setError("Password too short!");
      return;
    }
    setLoading(true);
    const validPassword = await checkPassword();
    if (validPassword) {
      const result = await updateUser(user.token, user.id, {
        password: newPassword
      });
      console.log(result);
    } else {
      console.log("wrong password!!");
    }
    setLoading(false);
  };
  const onDeleteAccount = async () => {
    setError("Please contact admin team!");
  };

  const onImportLocallySavedLists = async () => {
    const localDatabase = LoadSavedData();
    console.log("Do you want to import your locally saved lists?");
    console.log(localDatabase?.map(e => e.label));
    if (!localDatabase) return;
    if (window.confirm("Do you want to import your locally saved lists?")) {
      for (let i = 0; i < localDatabase.length; i++) {
        await dispatch(addWordList(localDatabase[i]));
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div>
        <Card>
          <CardHeader
            title={user?.name || "User"}
            subheader={new Date(user?.created).toDateString()}
          />
          <CardContent>
            <p>{user?.email}</p>
            <Button
              onClick={onImportLocallySavedLists}
              variant="outlined"
            >{`Import local Wordlists`}</Button>
          </CardContent>
        </Card>
        {loading && <p style={{ color: "salmon" }}>...verifying password...</p>}
        {error && (
          <MuiAlert elevation={6} variant="filled" severity="error">
            <p>{error}</p>
          </MuiAlert>
        )}
      </div>
      <Card style={{ marginLeft: "10px" }}>
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            variant="outlined"
            type="password"
            label="current password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="default"
            disabled={loading}
            onClick={onChangeName}
          >
            Change name
          </Button>
          <TextField
            type="password"
            label="new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="repeat new password"
            value={newRepeatedPassword}
            onChange={e => setNewRepeatedPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="default"
            disabled={loading}
            onClick={onChangePassword}
          >
            Change password
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={loading}
            onClick={onDeleteAccount}
          >
            Delete account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
