import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { validateEmail } from "../../Auth/auth";

export const ValidateEmail = () => {
  const location = useLocation();
  const history = useHistory();
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async validation_code => {
      try {
        const valid = await validateEmail(validation_code);
        setLoading(false);
        setUser(valid.user);
      } catch (err) {
        setError(err);
        console.log(err);
        setLoading(false);
      }
    };

    setLoading(true);
    const result = location.search.match(/\?code=(.+)/);
    if (result) {
      setCode(result[1]);
      validate(result[1]);
    } else setError("Invalid URL!");
  }, []);

  return (
    <Card
      variant="outlined"
      style={{ width: "25rem", boxShadow: "5px 5px 10px black" }}
    >
      <CardHeader
        style={{ backgroundColor: "gainsboro" }}
        title="Email Validation for WordPlay"
      />
      <CardContent>
        {user && (
          <>
            <MuiAlert elevation={6} variant="filled" severity="success">
              {user.email} validated!
            </MuiAlert>
            <MuiAlert elevation={6} variant="filled" severity="success">
              Dear {user.name}, you can now log in!
            </MuiAlert>
          </>
        )}
        {loading && (
          <MuiAlert elevation={6} variant="filled" severity="info">
            ...Please wait, contacting the Server...
          </MuiAlert>
        )}
        {error && (
          <MuiAlert elevation={6} variant="filled" severity="error">
            {error}
          </MuiAlert>
        )}
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => history.push("/")}>
          Back to the app!
        </Button>
      </CardActions>
    </Card>
  );
};
