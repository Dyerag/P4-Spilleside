using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using UnityEngine;

public class PipeMoveScript : MonoBehaviour
{
    // Hvor hurtigt en pipe kan bevæge sig 
    public float moveSpeed = 5;
    // Afgrænsningen til at slette objektet
    public float deadZone = -40;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        transform.position = transform.position + (Vector3.left * moveSpeed) * Time.deltaTime;

        if (transform.position.x < deadZone)
        {
            Debug.Log("Pipe Deleted");
            Destroy(gameObject);
        }
    }
}
