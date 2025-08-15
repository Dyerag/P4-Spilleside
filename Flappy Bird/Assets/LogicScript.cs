using System.IO;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;


public class LogicScript : MonoBehaviour
{
    // PointGain bliver false når det er game over, for at undgå at tjene flere points mens man er død
    public bool PointGain = true;
    public int playerScore;
    public Text ScoreText;
    public GameObject ScoreDisplay;
    public GameObject gameOverScreen;
    public GameObject Bird;
    public GameObject PipeSpawner;

    [DllImport("__Internal")]
    private static extern void SaveScore(string score);

    // ContextMenu tilføjer en knap til at teste metoden
    /// <summary>
    /// tilføjer point til score og opdatere UI til den nye score
    /// </summary>
    /// <param name="scoreToAdd"></param>
    [ContextMenu("Increase Score")]
    public void AddScore(int scoreToAdd)
    {
        if (PointGain)
        {
            playerScore += scoreToAdd;
            ScoreText.text = playerScore.ToString();
        }
    }

    public void RestartGame()
    {
        // Henter den samme scene for at gæninlæse spillet
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    // Viser GameOver UI komponentet
    public void GameOver()
    {
        PointGain = false;
        // Angular siden skal have ha en function der er synlig, umiddelbart med samme navn som denne
        SaveScore(JsonUtility.ToJson(new Score(playerScore)));
        gameOverScreen.SetActive(true);
    }
}

public class Score
{
    public int PlayerScore;
    public Score(int score)
    {
        PlayerScore = score;
    }
}