import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
    padding: theme.spacing(3),
  },
  link: {
    color: "inherit",
  },
}));

const Terms = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item align="center" xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                  {t("利用規約")}
                </Typography>
                <Typography>
                  {t(
                    "この利用規約は、lapi.gqが提供するサービス「FurPort」（以下、当サービス）における利用条件を定めるものです。当サービスの利用者は、本規約に同意するものといたします。"
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} align="left">
                <ol>
                  <li>
                    <Typography>
                      {t(
                        "当サービスの利用者は、自己の責任において、当サービスのユーザーIDおよびパスワードを適切に管理するものとします。"
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "lapi.gqは、投稿されたすべての情報を予告なく閲覧し改変または削除できるものとします。"
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "lapi.gqは、ユーザーに通知することなく当サービスの内容を変更しまたは当サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。"
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "lapi.gqは、ユーザーに通知することなくいつでも本規約を変更することができるものとします。"
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "当サービスの利用者は、下記のいずれかに該当または類似する行為をしてはなりません。"
                      )}
                    </Typography>
                    <ol>
                      <li>{t("法令または公序良俗に違反する行為")}</li>
                      <li>
                        {t(
                          "当サービス、当サービスの他の利用者、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為"
                        )}
                      </li>
                      <li>{t("当サービスの運営を妨害するおそれのある行為")}</li>
                      <li>{t("不正アクセスをし、またはこれを試みる行為")}</li>
                      <li>
                        {t(
                          "当サービスの他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為"
                        )}
                      </li>
                      <li>
                        {t(
                          "以下の表現を含む内容を当サービス上に投稿し、または送信する行為"
                        )}
                        <ol>
                          <li>{t("過度に暴力的な表現")}</li>
                          <li>{t("露骨な性的表現")}</li>
                          <li>
                            {t(
                              "人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現"
                            )}
                          </li>
                          <li>
                            {t(
                              "その他反社会的な内容を含み他人に不快感を与える表現"
                            )}
                          </li>
                        </ol>
                      </li>
                      <li>
                        {t("以下を目的とする行為")}
                        <ol>
                          <li>{t("営業、宣伝、広告、勧誘、その他営利目的")}</li>
                          <li>
                            {t(
                              "当サービスの他の利用者に対する嫌がらせや誹謗中傷を目的とする行為"
                            )}
                          </li>
                          <li>
                            {t(
                              "当サービスの他の利用者、または第三者に不利益、損害または不快感を与えることを目的とする行為"
                            )}
                          </li>
                          <li>{t("宗教活動または宗教団体への勧誘")}</li>
                        </ol>
                      </li>
                      <li>{t("その他、lapi.gqが不適切と判断する行為")}</li>
                    </ol>
                  </li>
                </ol>
                <Typography align="right">
                  {t("{{date, YYYY年MM月DD日}} 制定", {
                    date: new Intl.DateTimeFormat(language, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date("2020-07-15")),
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item align="center" xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                  {t("プライバシーポリシー")}
                </Typography>
              </Grid>
              <Grid item xs={12} align="left">
                <Typography>
                  {t(
                    "lapi.gqは、本ウェブサイト上で提供するサービス「FurPort」（以下、当サービス）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「当ポリシー」といいます。）を定めます。"
                  )}
                </Typography>
                <ol>
                  <li>
                    <Typography>
                      {t("当サービスは、以下の個人情報を収集・保管します。")}
                    </Typography>
                    <ol>
                      <li>{t("メールアドレス")}</li>
                    </ol>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "当サービスは、ユーザーが外部サービスとの連携を許可した場合、以下の情報を当該外部サービスから取得・保管します。"
                      )}
                    </Typography>
                    <ol>
                      <li>{t("外部サービスでユーザーが利用するID")}</li>
                      <li>{t("外部サービスへのアクセストークン")}</li>
                      <li>
                        {t(
                          "その他外部サービスの設定によりユーザーが開示を認めた情報"
                        )}
                      </li>
                    </ol>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "当サービスは、アクセス解析ツール「Googleアナリティクス」によって技術情報を取得・保管します。Googleアナリティクスにおける個人情報の取り扱いについては以下のサイトを参照してください。"
                      )}
                    </Typography>
                    <ul>
                      <li>
                        <a
                          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                          className={classes.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Googleアナリティクス利用規約
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://policies.google.com/privacy"
                          className={classes.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Googleプライバシーポリシー
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Typography>
                      {t(
                        "当サービスは、収集した個人情報をサービスの提供・運営のため必要な範囲で利用いたします。"
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "当サービスは、あらかじめユーザーの同意を得ることなく第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。"
                      )}
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      {t(
                        "当ポリシーの内容は、ユーザーに通知することなくいつでも変更することができるものとします。"
                      )}
                    </Typography>
                  </li>
                </ol>
                <Typography align="right">
                  {t("{{date, YYYY年MM月DD日}} 制定", {
                    date: new Intl.DateTimeFormat(language, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date("2020-07-15")),
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Terms;
