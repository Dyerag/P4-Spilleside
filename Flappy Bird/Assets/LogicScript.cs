using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class LogicScript : MonoBehaviour
{
    public int playerScore;
    public Text ScoreText;
    public GameObject gameOverScreen;
    // PointGain bliver false når det er game over, for at undgå at tjene flere point mens man er død
    public bool PointGain = true;

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
        gameOverScreen.SetActive(true);
    }
}
