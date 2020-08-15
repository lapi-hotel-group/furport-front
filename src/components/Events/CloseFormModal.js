import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dangerButton: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export default function AlertDialog(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Dialog open onClose={() => props.setShowCloseModal(false)}>
        <DialogTitle>{t("入力フォームを閉じる")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              "入力途中の内容が消えてしまいますが、入力フォームを閉じますか？"
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => props.setShowCloseModal(false)}
            color="secondary"
          >
            {t("キャンセル")}
          </Button>
          <Button
            variant="contained"
            className={classes.dangerButton}
            onClick={props.closeHandler}
          >
            {t("閉じる")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
