using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BirdScript : MonoBehaviour
{
    // Bird gameObject's komponent for real-time physics
    public Rigidbody2D Rigidbody;
    // En variabel for hvor højt fuglen skal flyve ved hvert tryk. Værdien sættes i unity
    public float flapStrength;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        // Læser inputs for om space er trykket
        if (Input.GetKeyDown(KeyCode.Space) == true)
            Rigidbody.velocity = Vector2.up * flapStrength;
    }
}
