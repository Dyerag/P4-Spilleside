using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
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
    public AudioSource FlapAudio;

    // Start is called before the first frame update
    void Start()
    {
        // Finder LogicScript gennem Logic Manager via tag
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>();
    }

    // Update is called once per frame
    void Update()
    {
        // Læser inputs for om space er trykket, og Bird stadigt er i live
        if (Input.GetKeyDown(KeyCode.Space) == true && birdIsAlive)
        {
            Rigidbody.velocity = Vector2.up * flapStrength;
            FlapAudio.Play();
        }

        // Stopper Bird fra at blive ved med at falde
        if (transform.position.y < -40 || transform.position.y > 40|| transform.position.x < -40 || transform.position.x > 40)
            // Stopper Bird fra at bevæge sig når den er udenfor Play Area
            GetComponent<Rigidbody2D>().constraints = RigidbodyConstraints2D.FreezePositionY;
    }

    // Når Bird rammer et objekt med kollision, er det game over.
    private void OnCollisionEnter2D(Collision2D collision)
    {
        FailState();
    }

    // Når Bird forlader trigger objektet på lag seks, som er Game Area, går spildet tabt
    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.layer == 6)
        {
            FailState();
        }
    }

    private void FailState()
    {
        birdIsAlive = false;
        logic.GameOver();

    }
}
