using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BirdScript : MonoBehaviour
{
    // Bird gameObject's komponent for real-time physics
    public Rigidbody2D Rigidbody;
    // En variabel for hvor højt fuglen skal flyve ved hvert tryk. Værdien sættes i unity
    public float flapStrength;
    public LogicScript logic;
    // Stopper input når bird rammer en pipe
    public bool birdIsAlive = true;

    // Start is called before the first frame update
    void Start()
    {
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>();

    }

    // Update is called once per frame
    void Update()
    {
        // Læser inputs for om space er trykket
        if (Input.GetKeyDown(KeyCode.Space) == true && birdIsAlive)
            Rigidbody.velocity = Vector2.up * flapStrength;
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        FailState();
    }
    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.layer == 6)
        {
            FailState();
        }
    }

    private void FailState()
    {
        logic.GameOver();
        birdIsAlive = false;
    }
}
